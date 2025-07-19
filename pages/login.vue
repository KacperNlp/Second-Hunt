<script setup lang="ts">
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false);

const handleLogin = async () => {
    if (!email.value || !password.value) {
        alert("Proszę wypełnić wszystkie pola");
        return;
    }

    isLoading.value = true;
    try {
        // TODO: Implement actual login logic here
        console.log("Logging in with:", { email: email.value, password: password.value, rememberMe: rememberMe.value });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Redirect to dashboard or home page
        // await navigateTo('/')
    } catch (error) {
        console.error("Login error:", error);
        alert("Błąd logowania. Spróbuj ponownie.");
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="gradient-bg">
        <div class="login-card">
            <!-- Header -->
            <div class="login-header">
                <h1 class="login-title">Zaloguj się</h1>
                <p class="login-subtitle">Witaj ponownie! Zaloguj się do swojego konta</p>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="handleLogin" class="login-form">
                <!-- Email Field -->
                <div class="form-group">
                    <label for="email" class="form-label">Adres email</label>
                    <input
                        id="email"
                        v-model="email"
                        type="email"
                        class="form-input"
                        placeholder="Wprowadź swój adres email"
                        required
                        :disabled="isLoading"
                    />
                </div>

                <!-- Password Field -->
                <div class="form-group">
                    <label for="password" class="form-label">Hasło</label>
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                        class="form-input"
                        placeholder="Wprowadź swoje hasło"
                        required
                        :disabled="isLoading"
                    />
                </div>

                <!-- Remember Me & Forgot Password -->
                <div class="form-options">
                    <label class="checkbox-container">
                        <input v-model="rememberMe" type="checkbox" class="checkbox-input" :disabled="isLoading" />
                        <span class="checkbox-custom"></span>
                        <span class="checkbox-label">Zapamiętaj mnie</span>
                    </label>

                    <NuxtLink to="/forgot-password" class="forgot-password"> Zapomniałeś hasła? </NuxtLink>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="login-button" :disabled="isLoading">
                    <span v-if="isLoading" class="loading-spinner"></span>
                    {{ isLoading ? "Logowanie..." : "Zaloguj się" }}
                </button>
            </form>

            <!-- Divider -->
            <div class="divider">
                <span class="divider-text">lub</span>
            </div>

            <!-- Social Login -->
            <div class="social-login">
                <button class="social-button google-button" :disabled="isLoading">
                    <svg class="social-icon" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Kontynuuj z Google
                </button>
            </div>

            <!-- Sign Up Link -->
            <div class="signup-link">
                <p class="signup-text">
                    Nie masz jeszcze konta?
                    <NuxtLink to="/register?type=user" class="signup-link-text"> Zarejestruj się </NuxtLink>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.gradient-bg {
    min-height: 100vh;
}

.login-card {
    background: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    padding: 2.5rem;
    width: 100%;
    max-width: 400px;
}

.login-header {
    text-align: center;
    margin-bottom: 2rem;
}

.login-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 0.5rem 0;
}

.login-subtitle {
    color: #6b7280;
    margin: 0;
    font-size: 0.875rem;
}

.login-form {
    margin-bottom: 1.5rem;
}

.form-group {
    margin-bottom: 1.25rem;
}

.form-label {
    display: block;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
}

.form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    box-sizing: border-box;
}

.form-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
}

.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.checkbox-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 0.875rem;
}

.checkbox-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkbox-custom {
    height: 1rem;
    width: 1rem;
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    margin-right: 0.5rem;
    position: relative;
    transition: all 0.2s ease;
}

.checkbox-input:checked ~ .checkbox-custom {
    background-color: #3b82f6;
    border-color: #3b82f6;
}

.checkbox-input:checked ~ .checkbox-custom::after {
    content: "";
    position: absolute;
    left: 0.25rem;
    top: 0.125rem;
    width: 0.25rem;
    height: 0.5rem;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.checkbox-label {
    color: #6b7280;
}

.forgot-password {
    color: #3b82f6;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
}

.forgot-password:hover {
    text-decoration: underline;
}

.login-button {
    width: 100%;
    padding: 0.75rem 1rem;
    background: #3b82f6;
    color: #ffffff;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.login-button:hover:not(:disabled) {
    background: #2563eb;
}

.login-button:disabled {
    background: #9ca3af;
    cursor: not-allowed;
}

.loading-spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid #ffffff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.divider {
    position: relative;
    text-align: center;
    margin: 1.5rem 0;
}

.divider::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e5e7eb;
}

.divider-text {
    background: #ffffff;
    padding: 0 1rem;
    color: #6b7280;
    font-size: 0.875rem;
}

.social-login {
    margin-bottom: 1.5rem;
}

.social-button {
    width: 100%;
    padding: 0.75rem 1rem;
    background: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.social-button:hover:not(:disabled) {
    background: #f9fafb;
    border-color: #9ca3af;
}

.social-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.social-icon {
    width: 1.25rem;
    height: 1.25rem;
}

.signup-link {
    text-align: center;
}

.signup-text {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0;
}

.signup-link-text {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
}

.signup-link-text:hover {
    text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 480px) {
    .login-card {
        padding: 1.5rem;
    }

    .login-title {
        font-size: 1.5rem;
    }

    .form-options {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
    }
}
</style>
