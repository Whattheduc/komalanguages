// 汉堡菜单切换
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// 点击导航链接后关闭菜单
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// 标签页导航交互功能
document.addEventListener('DOMContentLoaded', function() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const navDropdown = document.querySelector('.nav-dropdown');

    // 防止"更多"链接跳转
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 移动端点击切换
            if (window.innerWidth <= 768) {
                dropdownMenu.classList.toggle('active');
            }
        });
    }

    // 添加当前页面高亮
    function setActiveTab() {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        
        navTabs.forEach(tab => {
            tab.classList.remove('active');
            const href = tab.getAttribute('href');
            
            if (href === currentPath || 
                (currentPath === '/' && href === 'home.html') ||
                (currentHash && href === currentHash)) {
                tab.classList.add('active');
            }
        });
    }

    // 点击外部区域关闭下拉菜单
    document.addEventListener('click', (e) => {
        if (navDropdown && !navDropdown.contains(e.target)) {
            dropdownMenu.classList.remove('active');
        }
    });

    // 页面加载时设置活动标签
    setActiveTab();

    // 窗口大小改变时重新设置事件监听
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            dropdownMenu.classList.remove('active');
        }
    });
});

// 导航栏滚动效果
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// 复制联系方式功能
const copyButton = document.getElementById('copyButton');
const contactId = document.getElementById('contactId');

copyButton.addEventListener('click', () => {
    const contactText = contactId.textContent;
    
    // 使用现代剪贴板API
    if (navigator.clipboard) {
        navigator.clipboard.writeText(contactText).then(() => {
            showCopyFeedback();
        }).catch(() => {
            fallbackCopy(contactText);
        });
    } else {
        fallbackCopy(contactText);
    }
});

// 备用复制方法
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback();
    } catch (err) {
        alert('复制失败，请手动复制：' + text);
    }
    
    document.body.removeChild(textArea);
}

// 显示复制成功反馈
function showCopyFeedback() {
    const originalText = copyButton.textContent;
    copyButton.textContent = '已复制！';
    copyButton.style.background = '#10b981';
    
    setTimeout(() => {
        copyButton.textContent = originalText;
        copyButton.style.background = '';
    }, 2000);
}

// 滚动动画观察器
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .certificate-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 平滑滚动增强（对于不支持CSS scroll-behavior的浏览器）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // 跳过空锚点
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            
            const offsetTop = target.offsetTop - 70; // 减去导航栏高度
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

