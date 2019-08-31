<template>
    <div class="fillcontain">
        <meta  http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta  http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <el-form :model="searchForm"  ref="searchForm">
        <el-row :gutter="20" style="margin-left: 300px;margin-top: 10px;width: 800px">
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-autocomplete
                    class="inline-input"
                    v-model="searchForm.start_station"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入始发站"
                    :trigger-on-focus="true"
                    @select="handleSelect"
                ></el-autocomplete>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple" style="margin-left: 20px">

                <el-autocomplete
                    class="inline-input"
                    v-model="searchForm.end_station"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入终点站"
                    :trigger-on-focus="true"
                    @select="handleSelect"
                ></el-autocomplete>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-button type="primary" round  @click="submitForm('searchForm')">搜索</el-button>
            </div></el-col>
            <el-switch
                style="margin-top: 30px;margin-left: 20px"
                v-model="value1"
                @click.native="handelUpdate()"
                inactive-text="按开车时间排序"
                active-text="按运行时间排序">
            </el-switch>
        </el-row>
        </el-form>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%"
                row-key="train_number"
                :tree-props="{children: 'tableData_c', hasChildren: 'true'}">

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
                    label="运行及停靠时间"
                    prop="running_time">
                </el-table-column>

            </el-table>
            <el-row style="margin-top: 30px;margin-left: 150px">
                <el-col :span="24"><div class="grid-content bg-purple-dark" style="color: #1c8de0">如果查询结果中没有满足需求的车次，您还可以使用接续换乘 功能，查询途中换乘一次的部分列车余票情况</div></el-col>
            </el-row>
            <el-row style="margin-top: 30px;margin-left: 400px">
                <el-col :span="24"><div class="grid-content bg-purple">
                    <el-button type="primary"   @click="transfer()">接续换乘</el-button>
                </div></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getTrainScheduleList,searchTrainSchedule,getAllStationName} from '@/api/getData'
    export default {
        data(){
            return {
                value1: false,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [

                ],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
                searchForm:
                    {
                        start_station: '',
                        end_station:"",
                        date:""

                    },
                stationData:[],
            }
        },
       async created(){
           const res = await getAllStationName()
           this.stationData = res.dataLists;
        },
    	components: {
    		headTop,
    	},
        methods: {

            async submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.tableData = [];
                        const res = await searchTrainSchedule({train_start_station:this.searchForm.start_station , train_end_station:this.searchForm.end_station})
                        if (res.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '搜索成功'

                            });
                            this.tableData = [];
                            for(var i = 0 ; i < res.trainScheduleInfoList.length ; i++ )
                            {

                                let tableData = {
                                    train_number:"",
                                    start_station:"",
                                    end_station:"",
                                    start_time:"",
                                    arrive_time:"",
                                    running_time:"",
                                    tableData_c:[
                                        {
                                            train_number:"07",
                                            start_station:"088",
                                            end_station:"09",
                                            start_time:"049",
                                            arrive_time:"059",
                                            running_time:"069"
                                        }]};
                                tableData.train_number = res.trainScheduleInfoList[i].train_number;
                                tableData.start_station =res.trainScheduleInfoList[i].start_station;
                                tableData.end_station = res.trainScheduleInfoList[i].end_station;
                                tableData.start_time = res.trainScheduleInfoList[i].start_time;
                                tableData.arrive_time = res.trainScheduleInfoList[i].arrive_time;
                                let start_running_time = res.trainScheduleInfoList[i].start_running_time;
                                let end_running_time = res.trainScheduleInfoList[i].end_running_time;
                                let start_running_time2 = start_running_time.split(":");
                                let end_running_time2 = end_running_time.split(":");
                                let start_second =  parseInt(start_running_time2[0]) *60   + parseInt(start_running_time2[1]);
                                let end_second =  parseInt(end_running_time2[0]) *60   + parseInt(end_running_time2[1]);
                                let sub  = end_second -start_second;
                                let h = Math.floor(sub/60);
                                let min = sub%60;
                                let h2   =   h.toString();
                                let min2   =   min.toString();
                                let min3 = "";
                                let h3 = "";
                                if(h2.length == 1)
                                {
                                     h3 = "0" +h2;
                                }
                                else
                                {
                                     h3 = h2;
                                }
                                if(min2.length == 1)
                                {
                                     min3 = "0" +min2;
                                }
                                else
                                {
                                     min3 = min2;
                                }

                                const result = h3+":"+min3;

                                tableData.running_time = result;

                                const TrainScheduleList  = await getTrainScheduleList({train_start_station_no:res.trainScheduleInfoList[i].start_no , train_end_station_no:res.trainScheduleInfoList[i].end_no ,train_no :res.trainScheduleInfoList[i].train_no})
                                if(TrainScheduleList.status == 1)
                                {
                                    var tableData_c = [];
                                    for(var j = 0 ; j < TrainScheduleList.trainScheduleInfoList.length ; j++ )
                                    {
                                        var tableData_temp = {}
                                        tableData_temp.train_number = TrainScheduleList.trainScheduleInfoList[j].train_number+"--"+j;
                                        tableData_temp.start_station =TrainScheduleList.trainScheduleInfoList[j].start_station;
                                        tableData_temp.end_station = TrainScheduleList.trainScheduleInfoList[j].end_station;
                                        tableData_temp.start_time = TrainScheduleList.trainScheduleInfoList[j].start_time;
                                        tableData_temp.arrive_time = TrainScheduleList.trainScheduleInfoList[j].arrive_time;
                                        let start_running_time = TrainScheduleList.trainScheduleInfoList[j].start_running_time;
                                        let end_running_time = TrainScheduleList.trainScheduleInfoList[j].end_running_time;
                                        let start_running_time2 = start_running_time.split(":");
                                        let end_running_time2 = end_running_time.split(":");
                                        let start_second =  parseInt(start_running_time2[0]) *60   + parseInt(start_running_time2[1]);
                                        let end_second =  parseInt(end_running_time2[0]) *60   + parseInt(end_running_time2[1]);
                                        let sub  = end_second -start_second;
                                        let h = Math.floor(sub/60);
                                        let min = sub%60;
                                        let h2   =   h.toString();
                                        let min2   =   min.toString();
                                        let min3 = "";
                                        let h3 = "";
                                        if(h2.length == 1)
                                        {
                                            h3 = "0" +h2;
                                        }
                                        else
                                        {
                                            h3 = h2;
                                        }
                                        if(min2.length == 1)
                                        {
                                            min3 = "0" +min2;
                                        }
                                        else
                                        {
                                            min3 = min2;
                                        }

                                        let result = h3+":"+min3;
                                        tableData_temp.running_time = result;
                                        tableData_c.push(tableData_temp);


                                    }
                                    tableData.tableData_c = tableData_c;
                                }
                                this.tableData.push(tableData);
                                this.TrainRank();

                            }
                        }else{
                            this.$message({
                                type: 'error',
                                message: '搜索失败，没有对应的列车'
                            });
                        }
                    }

                });
            },
        TrainRank()
        {
                if(this.value1 === false)
                {
                    for(let i = 0 ; i < this.tableData.length ; i++)
                    {
                        for(let j = 0 ; j <this.tableData.length - i -1 ; j++ )
                        {
                            if(this.transferTime(this.tableData[j].start_time) >this.transferTime(this.tableData[j+1].start_time))
                            {
                                let temp = this.tableData[j];
                                this.tableData[j] = this.tableData[j+1];
                                this.tableData[j+1] = temp;
                            }
                        }
                    }
                }
                else
                {
                    for(let i = 0 ; i < this.tableData.length ; i++)
                    {
                        for(let j = 0 ; j <this.tableData.length - i -1 ; j++ )
                        {
                            if(this.transferTime(this.tableData[j].running_time) >this.transferTime(this.tableData[j+1].running_time))
                            {
                                let temp = this.tableData[j];
                                this.tableData[j] = this.tableData[j+1];
                                this.tableData[j+1] = temp;
                            }
                        }
                    }
                }
        },
            transferTime(time)
            {
                let time2 = time.split(":");
                let second =  parseInt(time2[0]) *60   + parseInt(time2[1]);
                return second;
            },


            transfer()
            {
                this.$router.push('/TrainTransfer')
            },
            handelUpdate()
            {
                this.TrainRank();

            },
            async querySearch(queryString, cb) {
                var houseNumberList = this.stationData;
                let results = queryString ? houseNumberList.filter(this.createFilter(queryString)) : houseNumberList;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 1000 * Math.random());

            },
            createFilter(queryString) {
                return (houseNumber) => {
                    return (houseNumber.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
                };


            },
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
