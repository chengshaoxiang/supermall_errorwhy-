import { debonce } from "common/utils.js"
export const itemListenerMixin = {
    mounted() {
        const refresh = debonce(this.$refs.scroll.refresh, 500);
        this.itemImgListener = () => refresh();
        this.$bus.$on('imageLoad', this.itemImgListener);
    }
}

import { POP, NEW, SELL } from "./const";
export const tabControlMixin = {
    data: function() {
        return {
            currentType: POP
        }
    },
    methods: {
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = POP
                    break
                case 1:
                    this.currentType = NEW
                    break
                case 2:
                    this.currentType = SELL
                    break
            }
            console.log(this.currentType);
        }
    }
}