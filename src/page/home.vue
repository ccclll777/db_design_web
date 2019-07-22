<template>
    <div>
        <head-top></head-top>
        <el-carousel height="500px">
            <el-carousel-item v-for="item in pics" :key="item.url">
                <img :src="item.url"/>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
	import headTop from '../components/headTop'

    export default {
    	data(){
    		return {
                pics: [
                    { url: require("../assets/123.PNG") },
                    { url: require("../assets/123.PNG") },
                    { url: require("../assets/123.PNG") },
                    { url: require("../assets/123.PNG") }
                ]

    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){

    	},
        computed: {

        },
    	methods: {


    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
