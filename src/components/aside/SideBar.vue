<template lang="html">
    <div id="main">
        <button id="reset" @click="resetFilters()">Reset Filters</button>
        <hr>
        
        <section id="price">
            <h3>Price Max</h3>
            <input type="range" min="1" max="100" value="40" class="slider" id="price-slider" v-model.number="filters.priceFilter" @change="emitFilters()">
            <p class="print">{{ filters.priceFilter }}€</p>
        </section>
        <hr>
        
        <section id="brands">
            <h3>Brands</h3>
            <div v-for="b in brands" class="brands choice" @click="getBrandsFilter(b)">
                <label :for="b">{{b}}</label>
                <button class="brands-btn" :class="filters.brandFilter == b ? 'checked' : 'unchecked'" :id="b" :value="b"></button>
            </div>
        </section>
        <hr>
        
        <section id="colors">
            <h3>Colors</h3>
            <div class="colors-wrap">
                <div class="colors" v-for="c in colors">
                    <button class="btn" :class="filters.colorFilter == c ? 'colorChecked' : 'unchecked'" :id="c" @click="getColorFilter(c)"></button>
                </div>
            </div>
        </section>
        <hr>
    </div>
</template>
<script>
export default {
    data () {
        return {
            brands: [ "obey", "zoo-york", "kooples", "element", "cbgb", "dickies" ],
            colors: [ "black", "white", "grey", "red", "green", "blue" ],
            filters: {
                priceFilter: 100,
                brandFilter: null,
                colorFilter: null,
            }
        }
    },
    methods: {
        resetFilters() {
            this.filters.priceFilter = 100;
            this.filters.brandFilter = null;
            this.filters.colorFilter = null;
            this.emitFilters();
        },
        getBrandsFilter(b) {
            /* let filterB = this.filters.brandFilter;

            if (filterB) {
                if (!filterB.includes(b)) filterB.push( b );
                else {
                    let index = filterB.indexOf(b);
                    filterB.splice(index, 1);
                }
            } else
                filterB.push( b ); */

            if (this.filters.brandFilter === b)
		this.filters.brandFilter = null;
            else
		this.filters.brandFilter = b;

            this.emitFilters();
        },
        getColorFilter(c) {
            if (this.filters.colorFilter === c)
		this.filters.colorFilter = null;
            else
		this.filters.colorFilter = c;

            this.emitFilters();
        },
        emitFilters() {
            this.$emit("get-filters", this.filters);
        }
    }
    
}
</script>

<style lang="css" scoped>
    #main {
        margin: 5vw;
        margin-top: 6rem;
        padding: 1rem;
        width: 30vw;
        border: solid 2px rgba(0, 0, 0, 0.14);
        border-radius: 10px;
    }
    
    section {
        margin-top: 1rem;
    }
    
    hr {
        margin: .8rem;
        border: 0;
        border-bottom: solid 1px black;
    }

    h3 {
        margin-bottom: .25rem;
    }

    #reset {
	background: #EEE;
        border: solid 1px rgb(0, 0, 0);
        border-radius: 6px;
	outline: none;
	padding: .5rem 1rem;
    }

    #reset:active {
	background: #A20;
	color: lightgrey;
    }

    #price-slider {
        height: 7px;
        background: #d3d3d3;
        border-radius: 5px;   
        margin: 1rem;
        outline: none;
        opacity: 0.7;
        transition: opacity .2s;
        width: 80%;
        -webkit-appearance: none;
        -webkit-transition: .2s;
    }

    #price-slider::-webkit-slider-thumb {
        appearance: none;
        background: #111;
        border-radius: 50%; 
        cursor: pointer;
        height: 20px;
        width: 20px;
        -webkit-appearance: none;
    }

    #price-slider::-moz-range-thumb {
        background: #111;
        border-radius: 50%; 
        cursor: pointer;
        height: 20px;
        width: 20px;
    }

    #price-slider::-webkit-slider-thumb:active {
        background: #A20;
    }

    #price-slider::-moz-range-thumb:active {
        background: #610;
    }

    .brands-btn {
        border: solid 2px rgba(0, 0, 0, .5);
        border-radius: 3px;
        height: 1rem;
        width: 1rem;
    }

    .brands-btn.checked {
        background: green;
    }
    
    .colors-wrap {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    
    .btn {
        width: 3vw;
        height: 3vw;
        border: solid 2px rgb(0, 0, 0);
    }

    .btn.colorChecked {
        border: solid 4px lightgreen;
	border-radius: 3px;
    }
    
    #black {
        background: black;
    }
    #white {
        background: white;
    }
    #grey {
        background: grey;
    }
    #red {
        background: red;
    }
    #green {
        background: green;
    }
    #blue {
        background: blue;
    }
</style>
