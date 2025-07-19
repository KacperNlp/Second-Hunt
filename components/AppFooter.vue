<template>
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-main">
                <div class="footer-logo">
                    <NuxtLink to="/" class="logo-link">
                        <span class="brand-name">SecondHunt</span>
                    </NuxtLink>
                    <p class="footer-description">Szukaj okazji do zakupu rzeczy w Twojej okolicy</p>
                </div>

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

                <div class="footer-contact">
                    <h3 class="footer-title">Kontakt</h3>
                    <div class="contact-info">
                        <a href="mailto:kontakt@secondhunt.pl" class="contact-item">
                            <UIcon name="mdi:email-outline" class="contact-icon" />
                            kontakt@secondhunt.pl
                        </a>
                        <a href="tel:+48123456789" class="contact-item">
                            <UIcon name="mdi:phone" class="contact-icon" />
                            +48 123 456 789
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-social">
                <h3 class="footer-title">Śledź nas</h3>
                <div class="social-links">
                    <a
                        href="https://facebook.com/secondhunt"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-link facebook"
                        aria-label="Sprawdź nas na Facebook"
                    >
                        <UIcon name="mdi:facebook" class="social-icon" />
                    </a>

                    <a
                        href="https://instagram.com/secondhunt"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-link instagram"
                        aria-label="Sprawdź nas na Instagram"
                    >
                        <UIcon name="mdi:instagram" class="social-icon" />
                    </a>

                    <a
                        href="https://twitter.com/secondhunt"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-link twitter"
                        aria-label="Sprawdź nas na Twitter"
                    >
                        <UIcon name="mdi:twitter" class="social-icon" />
                    </a>

                    <a
                        href="https://linkedin.com/company/secondhunt"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-link linkedin"
                        aria-label="Sprawdź nas na LinkedIn"
                    >
                        <UIcon name="mdi:linkedin" class="social-icon" />
                    </a>
                </div>
            </div>

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
