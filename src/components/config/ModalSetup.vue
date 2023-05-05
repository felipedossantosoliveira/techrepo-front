<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: String,
      default: "2xl",
    },
    closeable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["close"],
  methods: {
    closeOnEscape(e) {
      if (e.key === "Escape" && this.show) {
        this.close();
      }
    },
    close() {
      if (this.closeable) {
        this.$emit("close");
      }
    },
  },
  watch: {
    show: function () {
      if (this.show) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = null;
      }
    },
  },
  computed: {
    maxWidthClass(props) {
      return {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "3xl": "sm:max-w-3xl",
        "4xl": "sm:max-w-4xl",
        "5xl": "sm:max-w-5xl",
        "6xl": "sm:max-w-6xl",
      }[props.maxWidth];
    },
  },
  mounted() {
    document.addEventListener("keydown", this.closeOnEscape);
  },
  unmounted() {
    document.removeEventListener("keydown", this.closeOnEscape);
    document.body.style.overflow = null;
  },
};
</script>

<template>
  <teleport to="body">
    <transition leave-active-class="duration-200">
      <div
        v-show="show"
        class="fixed inset-0 z-100 mx-4 overflow-y-auto py-6 sm:px-0"
        scroll-region
      >
        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-show="show"
            class="fixed inset-0 transform transition-all"
            @click="close()"
          >
            <div class="absolute inset-0 bg-gray-500 opacity-75" />
          </div>
        </transition>

        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-show="show"
            :class="[
              maxWidthClass,
              'mb-6 transform overflow-hidden rounded-lg bg-zinc-800 shadow-xl transition-all sm:mx-auto sm:w-full',
            ]"
          >
            <slot v-if="show" />
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>