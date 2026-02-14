// ===================================
// Medical Lab Website - JavaScript
// Interactive Features & Animations
// ===================================

// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// ===== Header Scroll Effect =====
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== Results Form Handler =====
const resultsForm = document.getElementById('resultsForm');
const resultsDisplay = document.getElementById('resultsDisplay');
const resultsContent = document.getElementById('resultsContent');

resultsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const patientId = document.getElementById('patientId').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    
    // Simulate loading
    resultsContent.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="display: inline-block; width: 50px; height: 50px; border: 5px solid rgba(0, 168, 255, 0.3); border-top-color: #00a8ff; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 1rem; color: var(--text-gray);">جاري البحث عن النتائج...</p>
        </div>
    `;
    
    resultsDisplay.classList.remove('hidden');
    
    // Simulate API call
    setTimeout(() => {
        // Mock results data
        const mockResults = {
            patientName: 'أحمد محمد علي',
            testDate: new Date().toLocaleDateString('ar-SA'),
            testType: 'تحليل دم شامل',
            status: 'جاهز',
            results: [
                { test: 'عدد كريات الدم البيضاء', value: '7.5', unit: '×10³/μL', range: '4.0-11.0', status: 'طبيعي' },
                { test: 'عدد كريات الدم الحمراء', value: '5.2', unit: '×10⁶/μL', range: '4.5-5.9', status: 'طبيعي' },
                { test: 'الهيموجلوبين', value: '14.8', unit: 'g/dL', range: '13.0-17.0', status: 'طبيعي' },
                { test: 'الصفائح الدموية', value: '250', unit: '×10³/μL', range: '150-400', status: 'طبيعي' },
                { test: 'السكر الصائم', value: '95', unit: 'mg/dL', range: '70-100', status: 'طبيعي' }
            ]
        };
        
        resultsContent.innerHTML = `
            <div style="margin-bottom: 2rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <strong style="color: var(--text-light);">اسم المريض:</strong>
                        <span style="color: var(--text-gray); margin-right: 0.5rem;">${mockResults.patientName}</span>
                    </div>
                    <div>
                        <strong style="color: var(--text-light);">رقم التحليل:</strong>
                        <span style="color: var(--text-gray); margin-right: 0.5rem;">${patientId}</span>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <strong style="color: var(--text-light);">نوع التحليل:</strong>
                        <span style="color: var(--text-gray); margin-right: 0.5rem;">${mockResults.testType}</span>
                    </div>
                    <div>
                        <strong style="color: var(--text-light);">التاريخ:</strong>
                        <span style="color: var(--text-gray); margin-right: 0.5rem;">${mockResults.testDate}</span>
                    </div>
                </div>
                <div style="padding: 1rem; background: rgba(0, 200, 83, 0.1); border-radius: 8px; border: 1px solid rgba(0, 200, 83, 0.3);">
                    <strong style="color: #00c853;">✓ الحالة: جاهز</strong>
                </div>
            </div>
            
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: rgba(0, 168, 255, 0.1); border-bottom: 2px solid rgba(0, 168, 255, 0.3);">
                            <th style="padding: 1rem; text-align: right; color: var(--text-light);">اسم الفحص</th>
                            <th style="padding: 1rem; text-align: center; color: var(--text-light);">النتيجة</th>
                            <th style="padding: 1rem; text-align: center; color: var(--text-light);">الوحدة</th>
                            <th style="padding: 1rem; text-align: center; color: var(--text-light);">المعدل الطبيعي</th>
                            <th style="padding: 1rem; text-align: center; color: var(--text-light);">الحالة</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${mockResults.results.map(result => `
                            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                <td style="padding: 1rem; color: var(--text-gray);">${result.test}</td>
                                <td style="padding: 1rem; text-align: center; color: var(--primary-blue-light); font-weight: 600;">${result.value}</td>
                                <td style="padding: 1rem; text-align: center; color: var(--text-gray);">${result.unit}</td>
                                <td style="padding: 1rem; text-align: center; color: var(--text-gray);">${result.range}</td>
                                <td style="padding: 1rem; text-align: center;">
                                    <span style="background: rgba(0, 200, 83, 0.2); color: #00c853; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem;">
                                        ${result.status}
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div style="margin-top: 2rem; text-align: center;">
                <button onclick="window.print()" class="btn btn-primary" style="margin-left: 1rem;">طباعة النتائج</button>
                <button onclick="downloadResults()" class="btn btn-secondary">تحميل PDF</button>
            </div>
            
            <div style="margin-top: 2rem; padding: 1rem; background: rgba(0, 168, 255, 0.1); border-radius: 8px; border-right: 4px solid var(--primary-blue-light);">
                <p style="color: var(--text-gray); margin: 0;">
                    <strong style="color: var(--text-light);">ملاحظة:</strong>
                    يُرجى استشارة الطبيب المختص لتفسير النتائج بشكل دقيق
                </p>
            </div>
        `;
    }, 1500);
});

// ===== Appointment Form Handler =====
const appointmentForm = document.getElementById('appointmentForm');

appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        testType: document.getElementById('testType').value,
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        notes: document.getElementById('notes').value
    };
    
    // Show success message
    showNotification('تم حجز موعدك بنجاح! سنتواصل معك قريباً للتأكيد.', 'success');
    
    // Reset form
    appointmentForm.reset();
});

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Show success message
    showNotification('تم إرسال رسالتك بنجاح! سنرد عليك في أقرب وقت.', 'success');
    
    // Reset form
    contactForm.reset();
});

// ===== Notification Function =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? 'linear-gradient(135deg, #00c853 0%, #69f0ae 100%)' : 'linear-gradient(135deg, #f44336 0%, #ef5350 100%)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideDown 0.5s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// ===== Download Results Function =====
function downloadResults() {
    showNotification('جاري تحضير ملف PDF...', 'success');
    // In a real application, this would generate and download a PDF
}

// ===== Add CSS animations for notifications =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// ===== Set minimum date for appointment =====
const appointmentDateInput = document.getElementById('appointmentDate');
const today = new Date().toISOString().split('T')[0];
appointmentDateInput.setAttribute('min', today);

// ===== Active Navigation Link =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = '';
            });
            if (navLink) {
                navLink.style.color = 'var(--primary-blue-light)';
            }
        }
    });
});

// ===== Console Welcome Message =====
console.log('%c🏥 Medical Lab Website', 'font-size: 20px; font-weight: bold; color: #00a8ff;');
console.log('%cDeveloped with ❤️ using modern web technologies', 'font-size: 12px; color: #00bcd4;');
