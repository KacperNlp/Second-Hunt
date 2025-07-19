// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-05-15",
    devtools: { enabled: true },
    modules: ["@nuxt/ui", "@nuxtjs/leaflet"],

    css: ["~/assets/css/main.css"],

    runtimeConfig: {
        public: {
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
        },
    },

    app: {
        head: {
            htmlAttrs: {
                lang: "pl",
            },
            title: "SecondHunt - Odkryj ciucholandy z całej Polski",
            meta: [
                { name: "description", content: "SecondHunt - Odkryj ciucholandy z całej Polski" },
                { name: "keywords", content: "ciucholandy, vintage, polska, sklep, polska, polska, polska" },
                { name: "author", content: "SecondHunt" },
                { name: "robots", content: "index, follow" },
                { name: "googlebot", content: "index, follow" },
                { name: "google", content: "nositelinkssearchbox" },
                { name: "google", content: "notranslate" },
                { property: "og:title", content: "SecondHunt - Odkryj ciucholandy z całej Polski" },
                { property: "og:description", content: "SecondHunt - Odkryj ciucholandy z całej Polski" },
            ],
        },
    },
});
