<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-form :model="searchForm"  ref="searchForm">
            <el-row :gutter="20" style="margin-top: 10px">
                <el-col :span="12"><div class="grid-content bg-purple">
                    <el-input v-model="searchForm.train_number" placeholder="请输入要搜索的列车号">

                    </el-input>

                </div>
                </el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-button type="primary" round  @click="submitForm('searchForm')">搜索</el-button>
                </div>
                </el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-button type="primary" round  @click="showAll">显示全部列车</el-button>
                </div>
                </el-col>
            </el-row>
            </el-form>
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100% ;margin-top: 20px">
                <el-table-column

                    property="train_number"
                    label="车次"
                >
                </el-table-column>
                <el-table-column
                  property="train_type"
                  label="列车类型"
                >
                </el-table-column>
                <el-table-column
                  property="train_carriages"
                  label="车厢数"
                  >
                </el-table-column>
                <el-table-column
                  property="train_start_station"
                  label="始发站">
                </el-table-column>
                <el-table-column
                    property="train_end_station"
                    label="终点站">
                </el-table-column>
                <el-table-column
                    property="train_start_time"
                    label="开车时间">
                </el-table-column>
                <el-table-column
                    property="train_end_time"
                    label="到达时间">
                </el-table-column>
                <el-table-column
                    property="train_running_time"
                    label="总时间">
                </el-table-column>
                <el-table-column
                    property="train_arrive_day"
                    label="到达日期">
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <!--<el-pagination-->
                    <!--@size-change="handleSizeChange"-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:current-page="currentPage"-->
                    <!--:page-size="20"-->
                    <!--layout="total, prev, pager, next"-->
                    <!--:total="count">-->
                <!--</el-pagination>-->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="limit"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getUserList, getTrainInfoData,SearchTrainInfoData} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [
                ],searchForm:
                    {
                        train_number: ''
                    }
                ,
                currentRow: null,
                offset: 0,
                limit:20 ,
                count: 0,
                currentPage: 1

            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const TrainInfoData = await getTrainInfoData({offset: 0, limit: 10000});
                    if (TrainInfoData.status == 1) {

                        this.tableData = TrainInfoData.trainInfos;
                        this.count = TrainInfoData.trainInfos.length;
                        this.getLists();
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getLists();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getLists()
            },
            async getLists(){
                const TrainInfoData = await getTrainInfoData({offset: this.offset, limit: this.limit});
                this.tableData = [];
                for(var i = 0 ; i < TrainInfoData.trainInfos.length ; i++ )
                {
                    const tableData = {};
                    tableData.train_no = TrainInfoData.trainInfos[i].train_no;
                    tableData.train_number = TrainInfoData.trainInfos[i].train_number;
                    tableData.train_type = TrainInfoData.trainInfos[i].train_type;
                    tableData.train_carriages = TrainInfoData.trainInfos[i].train_carriages;
                    tableData.train_start_station = TrainInfoData.trainInfos[i].train_start_station;
                    tableData.train_end_station = TrainInfoData.trainInfos[i].train_end_station;
                    tableData.train_start_time = TrainInfoData.trainInfos[i].train_start_time;
                    tableData.train_end_time = TrainInfoData.trainInfos[i].train_end_time;
                    tableData.train_running_time = TrainInfoData.trainInfos[i].train_running_time;
                    tableData.train_arrive_day = TrainInfoData.trainInfos[i].train_arrive_day
                    this.tableData.push(tableData);
                }

            },
            async submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res = await SearchTrainInfoData({train_number:this.searchForm.train_number})
                        if (res.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '搜索成功'
                            });
                           this.tableData = []
                            const tableData = {};
                            tableData.train_no = res.trainInfo['train_no'];
                            tableData.train_number = res.trainInfo['train_number'];
                            tableData.train_type = res.trainInfo['train_type'];
                            tableData.train_carriages = res.trainInfo['train_carriages;']
                            tableData.train_start_station = res.trainInfo['train_start_station'];
                            tableData.train_end_station = res.trainInfo['train_end_station'];
                            tableData.train_start_time = res.trainInfo['train_start_time'];
                            tableData.train_end_time =res.trainInfo['train_end_time'];
                            tableData.train_running_time = res.trainInfo['train_running_time'];
                            tableData.train_arrive_day = res.trainInfo['train_arrive_day'];
                            this.tableData.push(tableData);
                            this.count=1;

                        }else{
                            this.$message({
                                type: 'error',
                                message: '搜索失败，没有对应的列车'
                            });
                        }
                    }

                });
            },
            async showAll()
            {
                this.initData();

            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
