// 表单验证和交互逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const taskTypeInputs = document.querySelectorAll('input[name="taskType"]');
    const questionText = document.getElementById('questionText');
    const answerText = document.getElementById('answerText');
    const uploadArea = document.getElementById('uploadArea');
    const chartUpload = document.getElementById('chartUpload');
    const startGradingBtn = document.getElementById('startGradingBtn');
    const overallScore = document.getElementById('overallScore');
    const scoreFills = document.querySelectorAll('.score-fill');
    const scoreValues = document.querySelectorAll('.score-value');
    const criteriaScores = document.querySelectorAll('.criteria-score');
    
    // 标签页切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // 表单验证函数
    function validateForm() {
        const hasTaskType = Array.from(taskTypeInputs).some(input => input.checked);
        const hasQuestion = questionText.value.trim().length > 0;
        const hasAnswer = answerText.value.trim().length > 0;
        
        return hasTaskType && hasQuestion && hasAnswer;
    }
    
    // 更新开始评分按钮状态
    function updateStartButton() {
        if (validateForm()) {
            startGradingBtn.disabled = false;
            startGradingBtn.style.background = '#333';
        } else {
            startGradingBtn.disabled = true;
            startGradingBtn.style.background = '#ccc';
        }
    }
    
    // 监听表单变化
    taskTypeInputs.forEach(input => {
        input.addEventListener('change', updateStartButton);
    });
    
    questionText.addEventListener('input', updateStartButton);
    answerText.addEventListener('input', updateStartButton);
    
    // 文件上传处理
    uploadArea.addEventListener('click', () => {
        chartUpload.click();
    });
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });
    
    chartUpload.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
    
    function handleFileUpload(file) {
        if (file.type.startsWith('image/')) {
            // 显示上传成功
            const uploadContent = uploadArea.querySelector('.upload-content');
            uploadContent.innerHTML = `
                <div class="upload-icon">✅</div>
                <p class="upload-text">已上传：${file.name}</p>
                <p class="upload-hint">点击重新上传</p>
            `;
            
            // 可以在这里添加图片预览功能
            const reader = new FileReader();
            reader.onload = function(e) {
                // 图片已加载，可以显示预览
            };
            reader.readAsDataURL(file);
        } else {
            alert('请上传图片文件');
        }
    }
    
    // 标签页切换
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // 添加活动状态
            btn.classList.add('active');
            document.getElementById(targetTab + '-panel').classList.add('active');
        });
    });
    
    // 开始评分按钮点击事件
    startGradingBtn.addEventListener('click', () => {
        if (!validateForm()) return;
        
        // 模拟评分过程
        simulateGrading();
    });
    
    // 模拟评分过程
    function simulateGrading() {
        startGradingBtn.disabled = true;
        startGradingBtn.innerHTML = '<span class="btn-icon">⏳</span>评分中...';
        
        // 模拟评分延迟
        setTimeout(() => {
            // 生成随机评分（模拟真实评分结果）
            const scores = {
                taskResponse: Math.random() * 2 + 6, // 6-8分
                coherence: Math.random() * 2 + 6,
                grammar: Math.random() * 2 + 6,
                vocabulary: Math.random() * 2 + 6
            };
            
            // 计算总分
            const overall = (scores.taskResponse + scores.coherence + scores.grammar + scores.vocabulary) / 4;
            
            // 更新显示
            updateScores(overall, scores);
            
            // 恢复按钮
            startGradingBtn.disabled = false;
            startGradingBtn.innerHTML = '<span class="btn-icon">✓</span>重新评分';
            
        }, 2000);
    }
    
    // 更新评分显示
    function updateScores(overall, scores) {
        // 更新总分
        overallScore.textContent = overall.toFixed(1);
        
        // 更新各项评分
        const scoreItems = [
            { element: scoreFills[0], value: scores.taskResponse, display: scoreValues[0] },
            { element: scoreFills[1], value: scores.coherence, display: scoreValues[1] },
            { element: scoreFills[2], value: scores.grammar, display: scoreValues[2] },
            { element: scoreFills[3], value: scores.vocabulary, display: scoreValues[3] }
        ];
        
        scoreItems.forEach(item => {
            const percentage = (item.value / 9) * 100;
            item.element.style.width = percentage + '%';
            item.display.textContent = item.value.toFixed(1);
        });
        
        // 更新详细评分
        const criteriaItems = [
            { scores: [scores.taskResponse, scores.taskResponse, scores.taskResponse] },
            { scores: [scores.coherence, scores.coherence, scores.coherence] },
            { scores: [scores.grammar, scores.grammar, scores.grammar] },
            { scores: [scores.vocabulary, scores.vocabulary, scores.vocabulary] }
        ];
        
        let criteriaIndex = 0;
        criteriaItems.forEach(criteria => {
            criteria.scores.forEach(score => {
                criteriaScores[criteriaIndex].textContent = score.toFixed(1);
                criteriaIndex++;
            });
        });
    }
    
    // 拍照识别按钮功能（模拟）
    const photoBtns = document.querySelectorAll('.photo-btn');
    photoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 这里可以集成真实的OCR功能
            alert('拍照识别功能需要集成OCR服务，当前为演示版本');
        });
    });
    
    // 初始化表单状态
    updateStartButton();
});

// 平滑滚动到指定元素
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// 导出功能（如果需要）
function exportResults() {
    const results = {
        overallScore: document.getElementById('overallScore').textContent,
        taskType: document.querySelector('input[name="taskType"]:checked')?.value,
        questionText: document.getElementById('questionText').value,
        answerText: document.getElementById('answerText').value,
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'ielts-grading-result.json';
    link.click();
}
