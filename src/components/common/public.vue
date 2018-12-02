<template>
    <div style="height: 100%">
        <p-header></p-header>
        <section class="publicMian" style="height: 84%">
            <p-menu></p-menu>
            <div class="right">
                <div class="location">
                    <strong>你现在所在的位置是:</strong>
                    <span>商品管理页面</span>
                </div>
                <transition name="no-mode-translate-fade" mode="out-in">
                    <keep-alive>
                        <router-view class="add"></router-view>
                    </keep-alive>
                </transition>
            </div>
        </section>
        <footer class="footer">
            版权归石娟
        </footer>
    </div>
</template>

<script>
    import pHeader from './header';
    import pMenu from './menu';

    export default {
        components: {
            pHeader, pMenu,
        }

    }
</script>

<style scoped>
    .add {
        border: 0px solid #9ac70f;
        padding: 0px;
        margin: 20px;
    }
    .no-mode-translate-demo-wrapper {
        position: relative;
        height: 18px;
    }

    .no-mode-translate-demo-wrapper button {
        position: absolute;
    }

    .no-mode-translate-fade-enter-active, .no-mode-translate-fade-leave-active {
        transition: all 500ms;
    }

    .no-mode-translate-fade-enter, .no-mode-translate-fade-leave-active {
        opacity: 0;
    }

    .no-mode-translate-fade-enter {
        transform: translateX(31px);
    }

    .no-mode-translate-fade-leave-active {
        transform: translateX(-31px);
    }

</style>
