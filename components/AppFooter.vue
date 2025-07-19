<template>
    <footer class="footer">
        <div class="footer-container">
            <!-- Main Footer Content -->
            <div class="footer-main">
                <!-- Logo Section -->
                <div class="footer-logo">
                    <NuxtLink to="/" class="logo-link">
                        <span class="brand-name">SecondHunt</span>
                    </NuxtLink>
                    <p class="footer-description">Twoja platforma do sprzedaży i kupna używanych rzeczy</p>
                </div>

                <!-- Navigation Links -->
                <div class="footer-nav">
                    <h3 class="footer-title">Nawigacja</h3>
                    <ul class="footer-links">
                        <li class="footer-link-item">
                            <NuxtLink to="/" class="footer-link"> Strona główna </NuxtLink>
                        </li>
                        <li class="footer-link-item">
                            <NuxtLink to="/about-us" class="footer-link"> O nas </NuxtLink>
                        </li>
                        <li class="footer-link-item">
                            <NuxtLink to="/business" class="footer-link"> Dla biznesu </NuxtLink>
                        </li>
                        <li class="footer-link-item">
                            <NuxtLink to="/terms" class="footer-link"> Regulamin </NuxtLink>
                        </li>
                        <li class="footer-link-item">
                            <NuxtLink to="/privacy" class="footer-link"> Polityka prywatności </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div class="footer-contact">
                    <h3 class="footer-title">Kontakt</h3>
                    <div class="contact-info">
                        <p class="contact-item">
                            <span class="contact-icon">📧</span>
                            kontakt@secondhunt.pl
                        </p>
                        <p class="contact-item">
                            <span class="contact-icon">📞</span>
                            +48 123 456 789
                        </p>
                    </div>
                </div>
            </div>

            <!-- Social Media Section -->
            <div class="footer-social">
                <h3 class="footer-title">Śledź nas</h3>
                <div class="social-links">
                    <a href="https://facebook.com/secondhunt" target="_blank" rel="noopener noreferrer" class="social-link facebook">
                        <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                            />
                        </svg>
                        <span class="social-text">Facebook</span>
                    </a>

                    <a href="https://instagram.com/secondhunt" target="_blank" rel="noopener noreferrer" class="social-link instagram">
                        <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"
                            />
                        </svg>
                        <span class="social-text">Instagram</span>
                    </a>

                    <a href="https://twitter.com/secondhunt" target="_blank" rel="noopener noreferrer" class="social-link twitter">
                        <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                            />
                        </svg>
                        <span class="social-text">Twitter</span>
                    </a>

                    <a href="https://linkedin.com/company/secondhunt" target="_blank" rel="noopener noreferrer" class="social-link linkedin">
                        <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                            />
                        </svg>
                        <span class="social-text">LinkedIn</span>
                    </a>
                </div>
            </div>

            <!-- Bottom Section -->
            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <p class="copyright">&copy; 2025 SecondHunt. Wszystkie prawa zastrzeżone.</p>
                    <div class="footer-bottom-links">
                        <NuxtLink to="/terms" class="footer-bottom-link"> Regulamin </NuxtLink>
                        <NuxtLink to="/privacy" class="footer-bottom-link"> Polityka prywatności </NuxtLink>
                        <NuxtLink to="/cookies" class="footer-bottom-link"> Polityka cookies </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background: #1f2937;
    color: #f9fafb;
    padding: 3rem 0 1rem 0;
}

.footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

.footer-main {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #374151;
}

.footer-logo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.logo-link {
    text-decoration: none;
    color: inherit;
}

.brand-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
}

.footer-description {
    color: #d1d5db;
    font-size: 0.875rem;
    line-height: 1.5;
    margin: 0;
    max-width: 300px;
}

.footer-title {
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 1rem 0;
}

.footer-links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.footer-link-item {
    margin: 0;
}

.footer-link {
    color: #d1d5db;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s ease;
    display: inline-block;
}

.footer-link:hover {
    color: #ffffff;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.contact-item {
    color: #d1d5db;
    font-size: 0.875rem;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.contact-icon {
    font-size: 1rem;
}

.footer-social {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #374151;
}

.social-links {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.social-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #374151;
    border-radius: 0.5rem;
    text-decoration: none;
    color: #d1d5db;
    transition: all 0.2s ease;
    font-size: 0.875rem;
    font-weight: 500;
}

.social-link:hover {
    background: #4b5563;
    color: #ffffff;
    transform: translateY(-1px);
}

.social-icon {
    width: 1.25rem;
    height: 1.25rem;
}

.social-text {
    display: none;
}

.footer-bottom {
    padding-top: 1rem;
}

.footer-bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.copyright {
    color: #9ca3af;
    font-size: 0.875rem;
    margin: 0;
}

.footer-bottom-links {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.footer-bottom-link {
    color: #9ca3af;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s ease;
}

.footer-bottom-link:hover {
    color: #ffffff;
}

/* Responsive Design */
@media (max-width: 768px) {
    .footer-main {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .footer-logo {
        text-align: center;
    }

    .footer-description {
        max-width: none;
    }

    .social-links {
        justify-content: center;
    }

    .social-text {
        display: inline;
    }

    .footer-bottom-content {
        flex-direction: column;
        text-align: center;
    }

    .footer-bottom-links {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .footer {
        padding: 2rem 0 1rem 0;
    }

    .social-links {
        flex-direction: column;
        align-items: center;
    }

    .social-link {
        width: 100%;
        max-width: 200px;
        justify-content: center;
    }
}
</style>
