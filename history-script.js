// 历史评分页面交互逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const tabBtns = document.querySelectorAll('.tab-btn');
    const searchInput = document.getElementById('searchInput');
    const historyCards = document.querySelectorAll('.history-card');
    const emptyState = document.getElementById('emptyState');
    const cardsContainer = document.querySelector('.cards-container');

    // 当前筛选状态
    let currentFilter = 'all';
    let currentSearch = '';

    // 筛选标签点击事件
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            // 添加当前活动状态
            btn.classList.add('active');
            
            // 更新筛选状态
            currentFilter = btn.getAttribute('data-filter');
            
            // 执行筛选
            filterCards();
        });
    });

    // 搜索输入事件
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase().trim();
        filterCards();
    });

    // 筛选卡片函数
    function filterCards() {
        let visibleCards = 0;
        
        historyCards.forEach(card => {
            const taskType = card.getAttribute('data-task');
            const questionText = card.querySelector('.question-text').textContent.toLowerCase();
            const taskTypeText = card.querySelector('.task-type').textContent.toLowerCase();
            
            // 检查筛选条件
            let matchesFilter = true;
            let matchesSearch = true;
            
            // 任务类型筛选
            if (currentFilter !== 'all') {
                matchesFilter = taskType === currentFilter;
            }
            
            // 搜索筛选
            if (currentSearch) {
                matchesSearch = questionText.includes(currentSearch) || 
                               taskTypeText.includes(currentSearch);
            }
            
            // 显示/隐藏卡片
            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
                visibleCards++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // 显示/隐藏空状态
        if (visibleCards === 0) {
            emptyState.style.display = 'block';
            cardsContainer.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            cardsContainer.style.display = 'grid';
        }
    }

    // 卡片点击事件
    historyCards.forEach(card => {
        card.addEventListener('click', () => {
            // 这里可以添加查看详情的功能
            const taskType = card.querySelector('.task-type').textContent;
            const score = card.querySelector('.score').textContent;
            const date = card.querySelector('.grading-date').textContent;
            
            // 模拟查看详情
            showCardDetail(taskType, score, date);
        });
    });

    // 显示卡片详情（模拟功能）
    function showCardDetail(taskType, score, date) {
        // 创建模态框
        const modal = document.createElement('div');
        modal.className = 'detail-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>评分详情</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="detail-item">
                        <span class="detail-label">任务类型：</span>
                        <span class="detail-value">${taskType}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">评分：</span>
                        <span class="detail-value">${score}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">评改日期：</span>
                        <span class="detail-value">${date}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">详细报告：</span>
                        <p class="detail-text">这里是详细的评分报告内容，包括各项维度的具体分析和改进建议...</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closeModal()">关闭</button>
                    <button class="btn-primary" onclick="exportReport()">导出报告</button>
                </div>
            </div>
        `;
        
        // 添加模态框样式
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: white;
            border-radius: 8px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        document.body.appendChild(modal);
        
        // 关闭按钮事件
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // 关闭模态框
    window.closeModal = function() {
        const modal = document.querySelector('.detail-modal');
        if (modal) {
            document.body.removeChild(modal);
        }
    };

    // 导出报告
    window.exportReport = function() {
        alert('导出功能需要集成文件下载服务');
        closeModal();
    };

    // 初始化
    filterCards();

    // 添加键盘快捷键
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K 聚焦搜索框
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // ESC 关闭模态框
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // 搜索框聚焦提示
    searchInput.addEventListener('focus', () => {
        searchInput.placeholder = '按 Ctrl+K 快速搜索';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.placeholder = '搜索所有历史评分';
    });
});

// 工具函数：格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// 工具函数：生成随机评分数据（用于演示）
function generateRandomScore() {
    const scores = [5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0];
    return scores[Math.floor(Math.random() * scores.length)];
}

// 工具函数：截断文本
function truncateText(text, maxLength = 150) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}
