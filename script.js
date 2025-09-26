// 定义世界各大城市的时区信息
const timeZones = [
    {
        city: '北京',
        country: '中国',
        timezone: 'Asia/Shanghai',
        flag: '🇨🇳'
    },
    {
        city: '纽约',
        country: '美国',
        timezone: 'America/New_York',
        flag: '🇺🇸'
    },
    {
        city: '伦敦',
        country: '英国',
        timezone: 'Europe/London',
        flag: '🇬🇧'
    },
    {
        city: '东京',
        country: '日本',
        timezone: 'Asia/Tokyo',
        flag: '🇯🇵'
    },
    {
        city: '悉尼',
        country: '澳大利亚',
        timezone: 'Australia/Sydney',
        flag: '🇦🇺'
    },
    {
        city: '巴黎',
        country: '法国',
        timezone: 'Europe/Paris',
        flag: '🇫🇷'
    },
    {
        city: '洛杉矶',
        country: '美国',
        timezone: 'America/Los_Angeles',
        flag: '🇺🇸'
    },
    {
        city: '新加坡',
        country: '新加坡',
        timezone: 'Asia/Singapore',
        flag: '🇸🇬'
    },
    {
        city: '莫斯科',
        country: '俄罗斯',
        timezone: 'Europe/Moscow',
        flag: '🇷🇺'
    },
    {
        city: '迪拜',
        country: '阿联酋',
        timezone: 'Asia/Dubai',
        flag: '🇦🇪'
    }
];

// 创建时钟卡片的HTML
function createClockCard(cityData) {
    return `
        <div class="clock-card" data-timezone="${cityData.timezone}">
            <div class="city-name">
                <span class="flag">${cityData.flag}</span>
                ${cityData.city}
            </div>
            <div class="country">${cityData.country}</div>
            <div class="time-display">
                <div class="time" id="time-${cityData.timezone.replace(/[\/]/g, '-')}">--:--:--</div>
                <div class="date" id="date-${cityData.timezone.replace(/[\/]/g, '-')}">--</div>
            </div>
            <div class="timezone-info">
                <span id="timezone-${cityData.timezone.replace(/[\/]/g, '-')}">时区信息</span>
            </div>
        </div>
    `;
}

// 格式化时间
function formatTime(date) {
    return date.toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// 格式化日期
function formatDate(date) {
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
}

// 获取时区偏移信息
function getTimezoneOffset(timezone) {
    try {
        const now = new Date();
        // 使用更精确的方法获取时区偏移
        const formatter = new Intl.DateTimeFormat('en', {
            timeZone: timezone,
            timeZoneName: 'longOffset'
        });
        
        const parts = formatter.formatToParts(now);
        const offsetPart = parts.find(part => part.type === 'timeZoneName');
        
        if (offsetPart && offsetPart.value.startsWith('GMT')) {
            return offsetPart.value.replace('GMT', 'UTC');
        }
        
        // 备用方法：手动计算偏移
        const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
        const targetTime = new Date(utc.toLocaleString("en-US", {timeZone: timezone}));
        const offsetMs = targetTime.getTime() - utc.getTime();
        const offsetHours = offsetMs / (1000 * 60 * 60);
        
        // 处理小时和分钟
        const hours = Math.floor(Math.abs(offsetHours));
        const minutes = Math.round((Math.abs(offsetHours) - hours) * 60);
        
        const sign = offsetHours >= 0 ? '+' : '-';
        
        if (minutes === 0) {
            return `UTC${sign}${hours}`;
        } else {
            return `UTC${sign}${hours}:${minutes.toString().padStart(2, '0')}`;
        }
    } catch (error) {
        console.error(`获取时区偏移失败: ${timezone}`, error);
        return 'UTC+?';
    }
}

// 更新单个时钟
function updateClock(cityData) {
    const timeId = `time-${cityData.timezone.replace(/[\/]/g, '-')}`;
    const dateId = `date-${cityData.timezone.replace(/[\/]/g, '-')}`;
    const timezoneId = `timezone-${cityData.timezone.replace(/[\/]/g, '-')}`;
    
    const timeElement = document.getElementById(timeId);
    const dateElement = document.getElementById(dateId);
    const timezoneElement = document.getElementById(timezoneId);
    
    if (timeElement && dateElement && timezoneElement) {
        try {
            const now = new Date();
            const localTime = new Date(now.toLocaleString("en-US", {timeZone: cityData.timezone}));
            
            // 添加更新动画
            timeElement.classList.add('updating');
            setTimeout(() => {
                timeElement.classList.remove('updating');
            }, 500);
            
            timeElement.textContent = formatTime(localTime);
            dateElement.textContent = formatDate(localTime);
            timezoneElement.textContent = getTimezoneOffset(cityData.timezone);
        } catch (error) {
            console.error(`更新 ${cityData.city} 时间时出错:`, error);
            timeElement.textContent = '时间获取失败';
            dateElement.textContent = '日期获取失败';
            timezoneElement.textContent = '时区信息获取失败';
        }
    }
}

// 更新所有时钟
function updateAllClocks() {
    timeZones.forEach(cityData => {
        updateClock(cityData);
    });
}

// 初始化时钟
function initializeClocks() {
    const clockGrid = document.getElementById('clockGrid');
    
    // 生成所有时钟卡片
    const clockCardsHTML = timeZones.map(cityData => createClockCard(cityData)).join('');
    clockGrid.innerHTML = clockCardsHTML;
    
    // 立即更新一次时间
    updateAllClocks();
    
    // 每秒更新时间
    setInterval(updateAllClocks, 1000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeClocks();
    
    // 添加页面可见性检测，当页面重新可见时立即更新时间
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            updateAllClocks();
        }
    });
});

// 处理窗口焦点事件，确保时间准确性
window.addEventListener('focus', function() {
    updateAllClocks();
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面发生错误:', e.error);
});
