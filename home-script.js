// 首页交互逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const welcomeText = document.getElementById('welcomeText');
    const usernameSpan = document.querySelector('.username');
    const upgradeBtn = document.getElementById('upgradeBtn');
    
    // 用户信息管理
    function getUserInfo() {
        // 从localStorage获取用户信息，如果没有则使用默认值
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return {
            username: '用户',
            isLoggedIn: false,
            remainingAttempts: 3
        };
    }
    
    function updateWelcomeMessage() {
        const userInfo = getUserInfo();
        if (userInfo.isLoggedIn) {
            usernameSpan.textContent = userInfo.username;
            usernameSpan.style.color = '#333';
            usernameSpan.style.fontWeight = '600';
        } else {
            usernameSpan.textContent = '用户';
            usernameSpan.style.color = '#666';
            usernameSpan.style.fontWeight = '400';
        }
    }
    
    // 升级按钮点击事件
    upgradeBtn.addEventListener('click', function() {
        showUpgradeModal();
    });
    
    // 显示升级模态框
    function showUpgradeModal() {
        const modal = document.createElement('div');
        modal.className = 'upgrade-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>获取无限次数</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="upgrade-options">
                        <div class="option-card">
                            <div class="option-icon">💎</div>
                            <h4>月度会员</h4>
                            <div class="price">¥99/月</div>
                            <ul class="features">
                                <li>无限次评分</li>
                                <li>详细分析报告</li>
                                <li>优先客服支持</li>
                            </ul>
                            <button class="select-btn" data-plan="monthly">选择月度</button>
                        </div>
                        <div class="option-card recommended">
                            <div class="recommended-badge">推荐</div>
                            <div class="option-icon">👑</div>
                            <h4>年度会员</h4>
                            <div class="price">¥599/年</div>
                            <div class="savings">节省 ¥589</div>
                            <ul class="features">
                                <li>无限次评分</li>
                                <li>详细分析报告</li>
                                <li>优先客服支持</li>
                                <li>专属学习计划</li>
                            </ul>
                            <button class="select-btn" data-plan="yearly">选择年度</button>
                        </div>
                    </div>
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
            border-radius: 12px;
            padding: 2rem;
            max-width: 600px;
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
        
        // 选择按钮事件
        const selectBtns = modal.querySelectorAll('.select-btn');
        selectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const plan = e.target.getAttribute('data-plan');
                handleUpgrade(plan);
                document.body.removeChild(modal);
            });
        });
    }
    
    // 处理升级
    function handleUpgrade(plan) {
        // 这里可以集成真实的支付系统
        alert(`您选择了${plan === 'monthly' ? '月度' : '年度'}会员，支付功能需要集成支付系统`);
        
        // 模拟升级成功
        const userInfo = getUserInfo();
        userInfo.isPremium = true;
        userInfo.remainingAttempts = 999;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        // 更新按钮状态
        upgradeBtn.innerHTML = '<span class="btn-icon">👑</span>已升级';
        upgradeBtn.style.background = '#28a745';
        upgradeBtn.disabled = true;
    }
    
    // 检查用户状态
    function checkUserStatus() {
        const userInfo = getUserInfo();
        if (userInfo.isPremium) {
            upgradeBtn.innerHTML = '<span class="btn-icon">👑</span>已升级';
            upgradeBtn.style.background = '#28a745';
            upgradeBtn.disabled = true;
        }
    }
    
    // 添加页面加载动画
    function addLoadingAnimations() {
        const elements = document.querySelectorAll('.content-left > *');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // 添加统计数字动画
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    // 数字动画
    function animateNumber(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isTime = target.includes('/');
        const numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
        
        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            if (isPercentage) {
                element.textContent = Math.floor(current) + '%';
            } else if (isTime) {
                element.textContent = Math.floor(current) + '/7';
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 30);
    }
    
    // 添加键盘快捷键
    document.addEventListener('keydown', (e) => {
        // 按 'G' 键快速开始评分
        if (e.key.toLowerCase() === 'g' && !e.ctrlKey && !e.metaKey) {
            const activeElement = document.activeElement;
            if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                window.location.href = 'grading.html';
            }
        }
        
        // 按 'U' 键快速升级
        if (e.key.toLowerCase() === 'u' && !e.ctrlKey && !e.metaKey) {
            const activeElement = document.activeElement;
            if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                upgradeBtn.click();
            }
        }
    });
    
    // 添加提示信息
    function showKeyboardShortcuts() {
        const shortcuts = document.createElement('div');
        shortcuts.className = 'keyboard-shortcuts';
        shortcuts.innerHTML = `
            <div class="shortcuts-content">
                <span class="shortcut">按 <kbd>G</kbd> 开始评分</span>
                <span class="shortcut">按 <kbd>U</kbd> 升级会员</span>
            </div>
        `;
        
        shortcuts.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            font-size: 0.85rem;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(shortcuts);
        
        // 3秒后显示提示
        setTimeout(() => {
            shortcuts.style.opacity = '1';
        }, 3000);
        
        // 10秒后隐藏提示
        setTimeout(() => {
            shortcuts.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(shortcuts)) {
                    document.body.removeChild(shortcuts);
                }
            }, 300);
        }, 10000);
    }
    
    // 初始化
    updateWelcomeMessage();
    checkUserStatus();
    addLoadingAnimations();
    animateStats();
    showKeyboardShortcuts();
    
    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        .upgrade-modal .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e9ecef;
        }
        
        .upgrade-modal .close-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        .upgrade-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
        }
        
        .option-card {
            position: relative;
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            border: 2px solid transparent;
            transition: all 0.3s ease;
        }
        
        .option-card.recommended {
            border-color: #ffc107;
            background: #fffbf0;
        }
        
        .recommended-badge {
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            background: #ffc107;
            color: #333;
            padding: 0.25rem 1rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .option-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        
        .option-card h4 {
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
            color: #333;
        }
        
        .price {
            font-size: 2rem;
            font-weight: 700;
            color: #333;
            margin-bottom: 0.5rem;
        }
        
        .savings {
            color: #28a745;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        
        .features {
            list-style: none;
            margin-bottom: 1.5rem;
        }
        
        .features li {
            padding: 0.25rem 0;
            color: #666;
        }
        
        .features li:before {
            content: '✓';
            color: #28a745;
            font-weight: bold;
            margin-right: 0.5rem;
        }
        
        .select-btn {
            width: 100%;
            padding: 0.75rem;
            background: #333;
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .select-btn:hover {
            background: #555;
        }
        
        .keyboard-shortcuts {
            font-family: 'Noto Sans SC', sans-serif;
        }
        
        .shortcuts-content {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .shortcut {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        kbd {
            background: rgba(255, 255, 255, 0.2);
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
            font-size: 0.8rem;
        }
    `;
    document.head.appendChild(style);
});
