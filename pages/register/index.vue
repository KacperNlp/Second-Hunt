<template>
    <div class="gradient-bg">
        <div class="flex flex-col items-center justify-center min-h-screen py-8">
            <div class="w-full max-w-2xl">
                <AppCard>
                    <div class="text-center mb-8">
                        <h1 class="text-2xl font-bold mb-2">
                            {{ isOwner ? "Rejestracja właściciela sklepu" : "Rejestracja użytkownika" }}
                        </h1>
                        <p class="text-gray-600">
                            {{ isOwner ? "Utwórz konto dla swojego sklepu second-hand" : "Dołącz do społeczności SecondHunt" }}
                        </p>
                    </div>

                    <form @submit.prevent="handleSubmit" class="space-y-4">
                        <div class="flex bg-gray-100 rounded-lg p-1 mb-6">
                            <button
                                type="button"
                                @click="switchToUser"
                                :class="[
                                    'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors cursor-pointer',
                                    !isOwner ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-800',
                                ]"
                            >
                                <UIcon name="material-symbols:person" class="size-4 mr-2" />
                                Użytkownik
                            </button>
                            <button
                                type="button"
                                @click="switchToOwner"
                                :class="[
                                    'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors cursor-pointer',
                                    isOwner ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-800',
                                ]"
                            >
                                <UIcon name="material-symbols:store" class="size-4 mr-2" />
                                Właściciel sklepu
                            </button>
                        </div>

                        <!-- Personal Information -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"> Imię * </label>
                                <UInput v-model="form.firstName" placeholder="Jan" :error="errors.firstName" required />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"> Nazwisko * </label>
                                <UInput v-model="form.lastName" placeholder="Kowalski" :error="errors.lastName" required />
                            </div>
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1"> Email * </label>
                            <UInput v-model="form.email" type="email" placeholder="jan.kowalski@example.com" :error="errors.email" required />
                        </div>

                        <!-- Phone -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1"> Telefon * </label>
                            <UInput v-model="form.phone" placeholder="+48 123 456 789" :error="errors.phone" required />
                        </div>

                        <!-- Store Information (Owner only) -->
                        <div v-if="isOwner" class="space-y-4 border-t pt-4">
                            <h3 class="text-lg font-semibold text-gray-800">Informacje o sklepie</h3>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"> Nazwa sklepu * </label>
                                <UInput v-model="form.storeName" placeholder="Second Hand Kowalski" :error="errors.storeName" required />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"> Adres sklepu * </label>
                                <UInput
                                    v-model="form.storeAddress"
                                    placeholder="ul. Przykładowa 1, 00-001 Warszawa"
                                    :error="errors.storeAddress"
                                    required
                                />
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1"> Województwo * </label>
                                    <USelect
                                        v-model="form.province"
                                        :items="provinces"
                                        option-attribute="label"
                                        value-attribute="value"
                                        placeholder="Wybierz województwo"
                                        :error="errors.province"
                                        required
                                    />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1"> Miasto * </label>
                                    <UInput v-model="form.city" placeholder="Warszawa" :error="errors.city" required />
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"> Kod pocztowy * </label>
                                <UInput v-model="form.zipCode" placeholder="00-001" :error="errors.zipCode" @input="formatZipCode" required />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"> Hasło * </label>
                                <UInput v-model="form.password" type="password" placeholder="Minimum 8 znaków" :error="errors.password" required />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"> Potwierdź hasło * </label>
                                <UInput
                                    v-model="form.confirmPassword"
                                    type="password"
                                    placeholder="Powtórz hasło"
                                    :error="errors.confirmPassword"
                                    required
                                />
                            </div>
                        </div>

                        <div class="flex items-start gap-2">
                            <UCheckbox v-model="form.acceptTerms" :error="errors.acceptTerms" required />
                            <label class="text-sm text-gray-600">
                                Akceptuję
                                <NuxtLink to="/regulamin" class="text-primary hover:underline">regulamin</NuxtLink>
                                i
                                <NuxtLink to="/polityka-prywatnosci" class="text-primary hover:underline">politykę prywatności</NuxtLink> *
                            </label>
                        </div>

                        <div v-if="!isOwner" class="flex items-start gap-2">
                            <UCheckbox v-model="form.newsletter" />
                            <label class="text-sm text-gray-600"> Chcę otrzymywać informacje o promocjach i nowych sklepach </label>
                        </div>

                        <UButton type="submit" color="primary" size="lg" class="w-full" :loading="isSubmitting" :disabled="!form.acceptTerms">
                            <UIcon name="material-symbols:person-add" class="size-4 mr-2" />
                            {{ isSubmitting ? "Rejestracja..." : "Zarejestruj się" }}
                        </UButton>
                    </form>

                    <div class="text-center mt-6">
                        <p class="text-sm text-gray-600">
                            Masz już konto?
                            <NuxtLink to="/login" class="text-primary hover:underline font-medium"> Zaloguj się </NuxtLink>
                        </p>
                    </div>
                </AppCard>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { createClient } from "@supabase/supabase-js";

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey);

const userType = ref(route.query.type as string);
const isOwner = computed(() => userType.value === "owner");

const form = ref({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    newsletter: false,
    // Owner-specific fields
    storeName: "",
    storeAddress: "",
    province: "",
    city: "",
    zipCode: "",
});

const errors = ref<Record<string, string>>({});
const isSubmitting = ref(false);

const provinces = [
    { value: "dolnośląskie", label: "Dolnośląskie", code: "DS" },
    { value: "kujawsko-pomorskie", label: "Kujawsko-Pomorskie", code: "KP" },
    { value: "lubelskie", label: "Lubelskie", code: "LB" },
    { value: "lubuskie", label: "Lubuskie", code: "LS" },
    { value: "łódzkie", label: "Łódzkie", code: "LD" },
    { value: "małopolskie", label: "Małopolskie", code: "MP" },
    { value: "mazowieckie", label: "Mazowieckie", code: "MZ" },
    { value: "opolskie", label: "Opolskie", code: "OP" },
    { value: "podkarpackie", label: "Podkarpackie", code: "PK" },
    { value: "podlaskie", label: "Podlaskie", code: "PL" },
    { value: "pomorskie", label: "Pomorskie", code: "PM" },
    { value: "śląskie", label: "Śląskie", code: "SL" },
    { value: "świętokrzyskie", label: "Świętokrzyskie", code: "SK" },
    { value: "warmińsko-mazurskie", label: "Warmińsko-Mazurskie", code: "WM" },
    { value: "wielkopolskie", label: "Wielkopolskie", code: "WP" },
    { value: "zachodniopomorskie", label: "Zachodniopomorskie", code: "ZP" },
];

function switchToUser() {
    router.push({ query: { type: "user" } });
    userType.value = "user";
}

function switchToOwner() {
    router.push({ query: { type: "owner" } });
    userType.value = "owner";
}

function formatZipCode() {
    let cleaned = form.value.zipCode.replace(/\D/g, "");
    if (cleaned.length > 5) {
        cleaned = cleaned.slice(0, 5);
    }
    if (cleaned.length > 2) {
        form.value.zipCode = cleaned.slice(0, 2) + "-" + cleaned.slice(2);
    } else {
        form.value.zipCode = cleaned;
    }
}

function validateForm(): boolean {
    errors.value = {};

    if (!form.value.firstName.trim()) {
        errors.value.firstName = "Imię jest wymagane";
    }

    if (!form.value.lastName.trim()) {
        errors.value.lastName = "Nazwisko jest wymagane";
    }

    if (!form.value.email.trim()) {
        errors.value.email = "Email jest wymagany";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        errors.value.email = "Nieprawidłowy format email";
    }

    if (!form.value.phone.trim()) {
        errors.value.phone = "Telefon jest wymagany";
    }

    if (!form.value.password) {
        errors.value.password = "Hasło jest wymagane";
    } else if (form.value.password.length < 8) {
        errors.value.password = "Hasło musi mieć minimum 8 znaków";
    }

    if (form.value.password !== form.value.confirmPassword) {
        errors.value.confirmPassword = "Hasła nie są identyczne";
    }

    if (!form.value.acceptTerms) {
        errors.value.acceptTerms = "Musisz zaakceptować regulamin";
    }

    if (isOwner.value) {
        if (!form.value.storeName.trim()) {
            errors.value.storeName = "Nazwa sklepu jest wymagana";
        }

        if (!form.value.storeAddress.trim()) {
            errors.value.storeAddress = "Adres sklepu jest wymagany";
        }

        if (!form.value.province) {
            errors.value.province = "Województwo jest wymagane";
        }

        if (!form.value.city.trim()) {
            errors.value.city = "Miasto jest wymagane";
        }

        if (!form.value.zipCode.trim()) {
            errors.value.zipCode = "Kod pocztowy jest wymagany";
        } else if (!/^\d{2}-\d{3}$/.test(form.value.zipCode)) {
            errors.value.zipCode = "Nieprawidłowy format kodu pocztowego";
        }
    }

    return Object.keys(errors.value).length === 0;
}

async function handleSubmit() {
    if (!validateForm()) {
        return;
    }

    isSubmitting.value = true;

    try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: form.value.email,
            password: form.value.password,
            options: {
                data: {
                    first_name: form.value.firstName,
                    last_name: form.value.lastName,
                    phone: form.value.phone,
                    user_type: isOwner.value ? "owner" : "user",
                    newsletter: form.value.newsletter,
                },
            },
        });

        if (authError) {
            throw authError;
        }

        if (isOwner.value && authData.user) {
            const { error: profileError } = await supabase.from("store_profiles").insert({
                user_id: authData.user.id,
                store_name: form.value.storeName,
                store_address: form.value.storeAddress,
                province: form.value.province,
                city: form.value.city,
                zip_code: form.value.zipCode,
            });

            if (profileError) {
                throw profileError;
            }
        }

        await navigateTo("/login?message=registration-success");
    } catch (error: any) {
        console.error("Registration error:", error);

        if (error.message?.includes("email")) {
            errors.value.email = "Ten email jest już zajęty";
        } else {
            errors.value.general = "Wystąpił błąd podczas rejestracji. Spróbuj ponownie.";
        }
    } finally {
        isSubmitting.value = false;
    }
}

onMounted(() => {
    if (!userType) {
        router.push({ query: { type: "user" } });
    }
});
</script>
