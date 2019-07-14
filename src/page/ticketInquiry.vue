<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-form :model="searchForm"  ref="searchForm">
            <el-row :gutter="20" style="margin-left: 180px;margin-top: 10px;width: 1000px">
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-input v-model="searchForm.start_station" placeholder="请输入始发站">

                    </el-input>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple" style="margin-left: 20px">
                    <el-input v-model="searchForm.end_station" placeholder="请输入终点站">

                    </el-input>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple" style="margin-left: 20px">
                    <div class="block">
                        <el-date-picker
                            v-model="searchForm.datetime"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-button type="primary" round  @click="submitForm('searchForm')">搜索</el-button>
                </div></el-col>
            </el-row>
        </el-form>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%"
                row-key="train_number">

                <el-table-column
                    label="车次"
                    prop="train_number">
                </el-table-column>
                <el-table-column
                    label="出发站"
                    prop="start_station">
                </el-table-column>
                <el-table-column
                    label="到达站"
                    prop="end_station">
                </el-table-column>
                <el-table-column
                    label="出发时间"
                    prop="start_time">
                </el-table-column>
                <el-table-column
                    label="到达时间"
                    prop="arrive_time">
                </el-table-column>
                <el-table-column
                    label="特等座/软卧"
                    prop="high_seat_price">
                </el-table-column>
                <el-table-column
                    label="一等座/硬卧"
                    prop="medium_seat_price">
                </el-table-column>
                <el-table-column
                    label="二等座/硬座"
                    prop="low_seat_price">
                </el-table-column>
            </el-table>

        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {queryTrainTicket} from '@/api/getData'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [
                    {
                        train_number:"01",
                        start_station:"02",
                        end_station:"03",
                        start_time:"04",
                        arrive_time:"05",
                        running_time:"06",
                        high_seat_price:"07",
                        medium_seat_price:"08",
                        low_seat_price:"09"

                    }
                ],

                searchForm:
                    {
                        start_station: '',
                        end_station:"",
                        datetime:""

                    }
            }
        },
        created(){
        },
        components: {
            headTop,
        },
        methods: {

            async submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.tableData = [];
                        const res = await queryTrainTicket({train_start_station:this.searchForm.start_station , train_end_station:this.searchForm.end_station ,datetime :this.searchForm.datetime})

                    }

                });
            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
