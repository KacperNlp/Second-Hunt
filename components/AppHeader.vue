<template>
    <header class="header">
        <div class="header-container">
            <div class="logo">
                <NuxtLink to="/" class="logo-link">
                    <span class="brand-name">SecondHunt</span>
                </NuxtLink>
            </div>

            <nav class="nav-desktop">
                <ul class="nav-list">
                    <li class="nav-item">
                        <NuxtLink to="/" class="nav-link" active-class="active"> Strona główna </NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink to="/about-us" class="nav-link" active-class="active"> O nas </NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink to="/business" class="nav-link" active-class="active"> Dla biznesu </NuxtLink>
                    </li>
                </ul>
            </nav>

            <div class="auth-buttons">
                <NuxtLink to="/login" class="btn btn-login"> Zaloguj się </NuxtLink>
                <NuxtLink to="/signup" class="btn btn-signup"> Zarejestruj się </NuxtLink>
            </div>

            <button class="mobile-menu-toggle" @click="toggleMobileMenu" :aria-expanded="isMobileMenuOpen" aria-label="Toggle mobile menu">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>
        </div>

        <nav class="nav-mobile" :class="{ 'nav-mobile--open': isMobileMenuOpen }">
            <ul class="nav-mobile-list">
                <li class="nav-mobile-item">
                    <NuxtLink to="/" class="nav-mobile-link" @click="closeMobileMenu"> Strona główna </NuxtLink>
                </li>
                <li class="nav-mobile-item">
                    <NuxtLink to="/about-us" class="nav-mobile-link" @click="closeMobileMenu"> O nas </NuxtLink>
                </li>
                <li class="nav-mobile-item">
                    <NuxtLink to="/business" class="nav-mobile-link" @click="closeMobileMenu"> Dla biznesu </NuxtLink>
                </li>
                <li class="nav-mobile-item">
                    <NuxtLink to="/login" class="nav-mobile-link" @click="closeMobileMenu"> Zaloguj się </NuxtLink>
                </li>
                <li class="nav-mobile-item">
                    <NuxtLink to="/register?type=user" class="nav-mobile-link" @click="closeMobileMenu"> Zarejestruj się </NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
};
</script>

<style scoped>
.header {
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
}

.logo-link {
    text-decoration: none;
    color: inherit;
}

.brand-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
}

.nav-desktop {
    display: none;
}

.nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
}

.nav-link {
    text-decoration: none;
    color: #6b7280;
    font-weight: 500;
    transition: color 0.2s ease;
    position: relative;
}

.nav-link:hover,
.nav-link.active {
    color: #1f2937;
}

.nav-link.active::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
    height: 2px;
    background: #3b82f6;
    border-radius: 1px;
}

.auth-buttons {
    display: none;
    gap: 0.75rem;
}

.btn {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
    display: inline-block;
}

.btn-login {
    color: #6b7280;
    background: transparent;
    border: 1px solid #d1d5db;
}

.btn-login:hover {
    color: #1f2937;
    border-color: #9ca3af;
}

.btn-signup {
    color: #ffffff;
    background: #3b82f6;
    border: 1px solid #3b82f6;
}

.btn-signup:hover {
    background: #2563eb;
    border-color: #2563eb;
}

.mobile-menu-toggle {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 30px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
}

.hamburger-line {
    width: 100%;
    height: 3px;
    background: #1f2937;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.nav-mobile {
    display: none;
    background: #ffffff;
    border-top: 1px solid #e5e7eb;
    padding: 1rem;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.nav-mobile--open {
    display: block;
}

.nav-mobile-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-mobile-item {
    border-bottom: 1px solid #f3f4f6;
}

.nav-mobile-item:last-child {
    border-bottom: none;
}

.nav-mobile-link {
    display: block;
    padding: 0.75rem 0;
    text-decoration: none;
    color: #6b7280;
    font-weight: 500;
    transition: color 0.2s ease;
}

.nav-mobile-link:hover {
    color: #1f2937;
}

/* Desktop styles */
@media (min-width: 768px) {
    .nav-desktop {
        display: block;
    }

    .auth-buttons {
        display: flex;
    }

    .mobile-menu-toggle {
        display: none;
    }

    .nav-mobile {
        display: none !important;
    }
}

/* Mobile menu animation */
@media (max-width: 767px) {
    .mobile-menu-toggle[aria-expanded="true"] .hamburger-line:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .mobile-menu-toggle[aria-expanded="true"] .hamburger-line:nth-child(2) {
        opacity: 0;
    }

    .mobile-menu-toggle[aria-expanded="true"] .hamburger-line:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}
</style>
