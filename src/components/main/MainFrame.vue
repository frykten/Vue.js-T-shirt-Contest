<template lang="html">
    <div id="main">
        <section class="tshirts" v-for="t in tshirtsFiltered || tshirts">
            <p class="name"><strong>{{ t.name }}</strong></p>
            <div class="img" :style="{ background: t.color }"></div>
            <p class="bp">
                <em class="brand">{{ t.brand }}€</em>
                <strong class="price">{{ t.price }}€</strong>
            </p>
        </section>
        <section class="tshirts" v-if="filters">
            <p>Filters: </p>
            <p>{{filters.priceFilter}}€</p>
            <p>{{filters.brandFilter}}</p>
            <p>{{filters.colorFilter}}</p>
        </section>
    </div>
</template>
<script>
    import axios from "axios";
    import cors from "cors";
    
    export default {
        data () {
            return {
                tshirts: null,
                tshirtsFiltered: null,
                counter: 0
            }
        },
        created: function() {
            this.getList();
            console.log(this.filters);
        },
        methods: {
            getList() {
                axios({
                    methods: "get",
                    url: "http://localhost:3001/list"
                }).then((res) => {
                    this.tshirts = res.data;
                }).catch((err) => {
                    console.warn(err);
                });
            },
            // To Work
            filterAll() {
                const needleP = this.filters.priceFilter;
                const needleB = this.filters.brandFilter;
                const needleC = this.filters.colorFilter;
                
                this.tshirtsFiltered = this.tshirts.filter((tshirt) => {
                    let targetP = tshirt.price;
                    
                    return targetP < needleP;
                }).filter((tshirt) => {
                    let targetB = tshirt.brand.toLocaleLowerCase();
                    
                    if (needleB)
                        return targetB.indexOf(needleB) > -1;
                    else
                        return tshirt;
                }).filter((tshirt) => {
                    let targetC = tshirt.color.toLocaleLowerCase();
                    
                    if (needleC)
                        return targetC.indexOf(needleC) > -1;
                    else
                        return tshirt;
                });
            },
            filterListPrice() {
                const needleP = parseInt(this.filters.priceFilter);
                
                this.tshirtsFiltered = this.tshirts.filter((tshirt) => {
                    let target = tshirt.price;
                    return target < needleP;
                });
            },
            filterListBrand() {
                console.log("Filtering Brand");
                const needleB = this.filters.brandFilter.toLocaleLowerCase();
                
                this.tshirtsFiltered = this.tshirts.filter((tshirt) => {
                    let target = tshirt.brand.toLocaleLowerCase();
                    return target.indexOf(needleB) > -1;
                });
            },
            filterListColor() {
                console.log("Filtering Color");
                const needleC = this.filters.colorFilter.toLocaleLowerCase();
                
                this.tshirtsFiltered = this.tshirts.filter((tshirt) => {
                    let target = tshirt.color.toLocaleLowerCase();
                    return target.indexOf(needleC) > -1;
                });
            },
        },
        props: [ "filters" ],
        watch: {
            filters: {
                handler: function first(s) {
                    this.filterAll();
                },
                deep: true
            },
        }
    }
</script>

<style lang="css" scoped>
    #main {
        display: flex;
        flex-wrap: wrap;
        margin: 5vw;
        margin-top: 6rem;
        position: absolute;
        top: 0;
        right: 0;
        width: 55vw;
    }
    
    .tshirts {
        border: solid 2px rgba(0, 0, 0, 0.14);
        border-radius: 10px;
        display: flex;
        height: 14vw;
        flex-direction: column;
	justify-content: space-between;
        margin: 0 .5rem .5rem 0;
        padding: .5rem;
        width: 14vw;

    }
    
    .name {
        align-self: flex-start;
        height: 20%;
    }
    
    .img {
	border: solid 1px rgba(0, 0, 0, .25);
        height: 60%;
	margin: 0 .5rem;
    }

    .bp {
	align-items: flex-end;
	display: flex;
	justify-content: space-between;
        height: 10%;
	margin-top: .5rem;
    }
</style>
