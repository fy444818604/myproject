<template>
    <div class="header">
        <img :src="logo" class="logo" alt=""/>
        <div class="user-system-name">{{ systemName }}</div>
        <div class="header-right">
            <i class="fy-menu-icon icon-home"></i>
            <div class="login-name" @click="loginOpShow?loginOpShow=false:loginOpShow=true">
                <div class="header-user-name">{{ userName }}</div>
                <i class="fy-menu-icon" :class="loginOpShow?'icon-header-up':'icon-header-down'"></i>
                <div class="login-op" v-show="loginOpShow">
                    <ul>
                        <li v-for="(value,index) in loginOp"><a :href="value.url">{{value.name}}</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>