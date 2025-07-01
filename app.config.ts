export default defineAppConfig({
  ui: {
    card: {
      slots: {
        root: "rounded-lg",
        header: "p-4 sm:px-6",
        body: "p-4 sm:p-6",
        footer: "p-4 sm:px-6",
      },
      variants: {
        variant: {
          solid: {
            root: "bg-inverted text-inverted",
          },
          outline: {
            root: "bg-default ring ring-default divide-y divide-default",
          },
          soft: {
            root: "bg-elevated/50 divide-y divide-default",
          },
          subtle: {
            root: "bg-elevated/50 ring ring-default divide-y divide-default",
          },
        },
      },
      defaultVariants: {
        variant: "outline",
      },
    },

    skeleton: {
      base: 'animate-skeleton-shimmer rounded-md bg-gradient-to-r from-[#f5f1ea] via-[#d4a259]/20 to-[#f5f1ea] bg-[length:200%_100%]',
      variants: {
        variant: {
          default: {
            base: 'animate-skeleton-shimmer rounded-md bg-gradient-to-r from-[#f5f1ea] via-[#d4a259]/20 to-[#f5f1ea] bg-[length:200%_100%]'
          },
          primary: {
            base: 'animate-skeleton-shimmer rounded-md bg-gradient-to-r from-[#4b6a5a]/10 via-[#4b6a5a]/30 to-[#4b6a5a]/10 bg-[length:200%_100%]'
          },
          secondary: {
            base: 'animate-skeleton-shimmer rounded-md bg-gradient-to-r from-[#d4a259]/10 via-[#d4a259]/40 to-[#d4a259]/10 bg-[length:200%_100%]'
          },
          subtle: {
            base: 'animate-skeleton-shimmer rounded-md bg-gradient-to-r from-[#fafaf3] via-[#d4a259]/10 to-[#fafaf3] bg-[length:200%_100%]'
          }
        },
        size: {
          sm: 'h-4',
          md: 'h-6',
          lg: 'h-8',
          xl: 'h-12'
        }
      },
      defaultVariants: {
        variant: 'default',
        size: 'md'
      }
    }
  },
});
