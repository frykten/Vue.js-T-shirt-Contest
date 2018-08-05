<template>
    <div id="app">
        <header-fixed></header-fixed>
        
        <side-bar @get-filters="filters = $event"></side-bar>
        
        <main-frame :filters="filters"></main-frame>

        <footer-fixed></footer-fixed>
    </div>
</template>

<script>
    import HeaderFixed from "./components/fixed/Header.vue";
    import SideBar from "./components/aside/SideBar.vue";
    import MainFrame from "./components/main/MainFrame.vue";
    import FooterFixed from "./components/fixed/Footer.vue";

    export default {
        name: 'app',
        components: {
            HeaderFixed,
            SideBar,
            MainFrame,
            FooterFixed,
        },
            data () {
                return {
                    msg: "We'll eat roasted squirrels!",
                    filters: null
            }
        }
    }
</script>

<style lang="scss">
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    #app {
        color: #2c3e50;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        margin-top: 60px;
        text-align: center;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
	padding: 0;
    }

    li {
	display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
