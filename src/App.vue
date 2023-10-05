<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import ProductCart from '@/components/ProductCart.vue'
import Cart from '@/components/icons/Cart.vue'

const router = useRouter()
const store = useCartStore()
const isCartOpen = ref(true)

router.beforeEach(() => {
  handleCart()
})

function debounce(fn: () => void, delay: number) {
  let timer: any = null
  return () => {
    clearTimeout(timer)
    timer = setTimeout(fn, delay)
  }
}

function toggleCart() {
  isCartOpen.value = !isCartOpen.value
}

function handleCart() {
  if (window.innerWidth >= 1024) {
    isCartOpen.value = true
  } else {
    isCartOpen.value = false
  }
}

handleCart()

onMounted(() => {
  window.addEventListener('resize', debounce(handleCart, 250))
})

onUnmounted(() => {
  window.removeEventListener('resize', debounce(handleCart, 250))
})
</script>

<template>
  <header class="sticky top-0 bg-stone-900 py-4 text-white">
    <div class="container flex items-center justify-between">
      <nav>
        <ul class="flex gap-4">
          <li>
            <RouterLink to="/"><span class="font-bold">The Identity Store</span></RouterLink>
          </li>
        </ul>
      </nav>
      <button class="relative text-2xl xl:hidden" @click="toggleCart">
        <Cart />
        <Transition name="fade">
          <span
            v-if="store.count"
            class="absolute top-1/2 h-4 w-4 rounded-full bg-red-400 text-xs leading-tight"
            >{{ store.count }}</span
          >
        </Transition>
      </button>
    </div>
  </header>

  <main class="container grid grid-cols-1 gap-10 py-10 md:grid-cols-3 xl:grid-cols-4">
    <RouterView />
    <ProductCart :isCartOpen="isCartOpen" />
  </main>
</template>

<style>
.btn {
  @apply h-10 rounded bg-blue-500 px-4 text-white active:translate-y-0.5;
}
.btn.decrease {
  @apply bg-yellow-500;
}
.btn.remove {
  @apply bg-red-500 text-white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>