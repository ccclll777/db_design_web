<template>
    <div class="fillcontain">
        <meta  http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta  http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <el-form :model="searchForm"  ref="searchForm">
            <el-row :gutter="20" style="margin-left: 180px;margin-top: 10px;width: 1000px">
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
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleSearch(scope.$index,searchForm.datetime,scope.row.train_no,scope.row.start_no,scope.row.end_no,scope.row.train_number)">查看余票</el-button>
                        <el-button
                            size="mini"
                            type="Success"
                            @click="handleBuy(scope.$index,searchForm.datetime,scope.row.train_no,scope.row.start_no,scope.row.end_no,
                            scope.row.train_number,scope.row.high_seat_price,scope.row.medium_seat_price,scope.row.low_seat_price)">预定</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- Table -->

            <el-dialog title="余座数" :visible.sync="dialogTableVisible_GD" style="width: 1500px">
                <el-table :data="high_seat_GD">

                    <el-table-column property="carriage_number" label="车厢号" width="150"></el-table-column>
                    <el-table-column property="seat_type" label="座位类型" width="200"></el-table-column>
                    <el-table-column property="A_num" label="A座"></el-table-column>
                    <el-table-column property="B_num" label="B座"></el-table-column>
                    <el-table-column property="C_num" label="C座"></el-table-column>
                </el-table>
                <el-table :data="medium_seat_GD">

                    <el-table-column property="carriage_number" label="车厢号" width="150"></el-table-column>
                    <el-table-column property="seat_type" label="座位类型" width="200"></el-table-column>
                    <el-table-column property="A_num" label="A座"></el-table-column>
                    <el-table-column property="B_num" label="B座"></el-table-column>
                    <el-table-column property="C_num" label="C座"></el-table-column>
                    <el-table-column property="D_num" label="D座"></el-table-column>
                </el-table>
                <el-table :data="low_seat_GD">

                    <el-table-column property="carriage_number" label="车厢号" width="150"></el-table-column>
                    <el-table-column property="seat_type" label="座位类型" width="200"></el-table-column>
                    <el-table-column property="A_num" label="A座"></el-table-column>
                    <el-table-column property="B_num" label="B座"></el-table-column>
                    <el-table-column property="C_num" label="C座"></el-table-column>
                    <el-table-column property="D_num" label="D座"></el-table-column>
                    <el-table-column property="E_num" label="E座"></el-table-column>
                </el-table>

            </el-dialog>


            <el-dialog title="余座数" :visible.sync="dialogTableVisible" style="width: 1500px">
                <el-table :data="high_seat">

                    <el-table-column property="carriage_number" label="车厢号" width="150"></el-table-column>
                    <el-table-column property="seat_type" label="座位类型" width="200"></el-table-column>
                    <el-table-column property="upper_num" label="上铺"></el-table-column>
                    <el-table-column property="lower_num" label="下铺"></el-table-column>
                </el-table>
                <el-table :data="medium_seat">

                    <el-table-column property="carriage_number" label="车厢号" width="150"></el-table-column>
                    <el-table-column property="seat_type" label="座位类型" width="200"></el-table-column>
                    <el-table-column property="upper_num" label="上铺"></el-table-column>
                    <el-table-column property="middle_num" label="中铺"></el-table-column>
                    <el-table-column property="lower_num" label="下铺"></el-table-column>
                </el-table>
                <el-table :data="low_seat">

                    <el-table-column property="carriage_number" label="车厢号" width="150"></el-table-column>
                    <el-table-column property="seat_type" label="座位类型" width="200"></el-table-column>
                    <el-table-column property="A_num" label="A座"></el-table-column>
                    <el-table-column property="B_num" label="B座"></el-table-column>
                    <el-table-column property="C_num" label="C座"></el-table-column>
                    <el-table-column property="D_num" label="D座"></el-table-column>
                    <el-table-column property="E_num" label="E座"></el-table-column>
                    <el-table-column property="F_num" label="F座"></el-table-column>
                </el-table>


            </el-dialog>
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
    import {queryTrainTicket,queryTrainTicketNum,getAllStationName} from '@/api/getData'
    import {TickerOrder} from "../router/index"
    export default {
        data(){
            return {
                value1: false,
                tableData: [
                ],
                selectTable: {},
                searchForm:
                    {
                        start_station: '',
                        end_station:"",
                        datetime:""

                    },
                high_seat:[
                    {
                        carriage_number:"1",
                        seat_type:"2",
                        upper_num:"3",
                        lower_num:"4"
                    }
                ],
                medium_seat:[
                    {
                        carriage_number:"1",
                        seat_type:"2",
                        upper_num:"3",
                        middle_num:"5",
                        lower_num:"4"
                    }
                ],
                low_seat:[
                    {
                        carriage_number:"1",
                        seat_type:"2",
                        A_num:"3",
                        B_num:"5",
                        C_num:"4",
                        D_num:"4",
                        E_num:"4",
                        F_num:"4"
                    }
                ],
                high_seat_GD:[
                    {
                        carriage_number:"1",
                        seat_type:"2",
                        A_num:"3",
                        B_num:"5",
                        C_num:"4"
                    }
                ],
                medium_seat_GD:[
                    {
                        carriage_number:"1",
                        seat_type:"2",
                        A_num:"3",
                        B_num:"5",
                        C_num:"4",
                        D_num:"4"
                    }
                ],
                low_seat_GD:[
                    {
                        carriage_number:"1",
                        seat_type:"2",
                        A_num:"3",
                        B_num:"5",
                        C_num:"4",
                        D_num:"4",
                        E_num:"4"
                    }
                ],
                dialogTableVisible: false,
                dialogTableVisible_GD: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
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
                        let date;
                        date= new Date(this.searchForm.datetime);

                        let datetime2 = date.getFullYear()+'-'+this.checkTime(date.getMonth()+1)+'-'+this.checkTime(date.getDate());
                        this.tableData = [];
                        const res = await queryTrainTicket({train_start_station:this.searchForm.start_station , train_end_station:this.searchForm.end_station ,datetime :datetime2})
                            if(res.status == 1)
                            {
                                this.$message({
                                    type: 'success',
                                    message: '查询成功'
                                });
                                this.tableData = [];
                                for(let i = 0 ; i < res.trainTicketPriceInfoList.length ; i++ )
                                {
                                    const tableData = {};
                                    tableData.train_no = res.trainTicketPriceInfoList[i].train_no;
                                    tableData.train_number = res.trainTicketPriceInfoList[i].train_number;
                                    tableData.start_station =res.trainTicketPriceInfoList[i].start_station;
                                    tableData.end_station = res.trainTicketPriceInfoList[i].end_station;
                                    tableData.start_time =res.trainTicketPriceInfoList[i].start_time;
                                    tableData.arrive_time = res.trainTicketPriceInfoList[i].arrive_time;
                                    tableData.high_seat_price = res.trainTicketPriceInfoList[i].high_seat_price;
                                    tableData.medium_seat_price = res.trainTicketPriceInfoList[i].medium_seat_price ;
                                    tableData.low_seat_price = res.trainTicketPriceInfoList[i].low_seat_price;
                                    tableData.end_no = res.trainTicketPriceInfoList[i].end_no;
                                    tableData.start_no =res.trainTicketPriceInfoList[i].start_no;

                                    this.tableData.push(tableData);
                                }
                                console.log(this.tableData)
                                this.TrainRank();
                            }
                            else if(res.status == 404)
                            {
                                this.$message({
                                    type: 'error',
                                    message: '没有符合条件的列车'
                                });
                            }else if(res.status == 406)
                            {
                                this.$message({
                                    type: 'error',
                                    message: '没有符合条件的列车'
                                });
                            }
                            else {
                                this.$message({
                                    type: 'error',
                                    message: '查询失败'
                                });
                            }
                    }

                });
            },
            async handleSearch(index,datetime,train_no,start_no,end_no,train_number)
            {
                let date;
                date= new Date(datetime);

                let datetime2 = date.getFullYear()+'-'+this.checkTime(date.getMonth()+1)+'-'+this.checkTime(date.getDate());

                const res = await queryTrainTicketNum({datetime:datetime2, train_no:train_no ,start_no :start_no,end_no:end_no,train_number:train_number})
                if(res.status == 1)
                {
                    if(train_number[0] == "G" || train_number[0] == "D")
                    {
                        this.high_seat_GD = [];
                        this.medium_seat_GD = [];
                        this.low_seat_GD = [];
                        for(let i = 0 ; i<res.trainRemainingSeats_gds.length ; i++)
                        {
                            if(res.trainRemainingSeats_gds[i].seat_type == "特等座")
                            {
                                let high_temp = {};
                                high_temp.carriage_number = res.trainRemainingSeats_gds[i].carriage_no;
                                high_temp.seat_type = res.trainRemainingSeats_gds[i].seat_type;
                                high_temp.A_num = res.trainRemainingSeats_gds[i].high_seat_GD_A;
                                high_temp.B_num = res.trainRemainingSeats_gds[i].high_seat_GD_B;
                                high_temp.C_num = res.trainRemainingSeats_gds[i].high_seat_GD_C;
                                this.high_seat_GD.push(high_temp);
                            }
                            if(res.trainRemainingSeats_gds[i].seat_type == "一等座")
                            {
                                let high_temp = {};
                                high_temp.carriage_number = res.trainRemainingSeats_gds[i].carriage_no;
                                high_temp.seat_type = res.trainRemainingSeats_gds[i].seat_type;
                                high_temp.A_num = res.trainRemainingSeats_gds[i].medium_seat_GD_A;
                                high_temp.B_num = res.trainRemainingSeats_gds[i].medium_seat_GD_B;
                                high_temp.C_num = res.trainRemainingSeats_gds[i].medium_seat_GD_C;
                                high_temp.D_num = res.trainRemainingSeats_gds[i].medium_seat_GD_D;
                                this.medium_seat_GD.push(high_temp);
                            }
                            if(res.trainRemainingSeats_gds[i].seat_type == "二等座")
                            {
                                let high_temp = {};
                                high_temp.carriage_number = res.trainRemainingSeats_gds[i].carriage_no;
                                high_temp.seat_type = res.trainRemainingSeats_gds[i].seat_type;
                                high_temp.A_num = res.trainRemainingSeats_gds[i].low_seat_GD_A;
                                high_temp.B_num = res.trainRemainingSeats_gds[i].low_seat_GD_B;
                                high_temp.C_num = res.trainRemainingSeats_gds[i].low_seat_GD_C;
                                high_temp.D_num = res.trainRemainingSeats_gds[i].low_seat_GD_D;
                                high_temp.E_num = res.trainRemainingSeats_gds[i].low_seat_GD_E;
                                this.low_seat_GD.push(high_temp);
                            }
                        }
                        this.dialogTableVisible_GD = true

                    }
                    else
                    {
                        this.high_seat = []
                        this.medium_seat = []
                        this.low_seat = []
                        for(let i = 0 ; i<res.trainRemainingSeats.length ; i++)
                        {
                            if(res.trainRemainingSeats[i].seat_type == "软卧")
                            {
                                let high_temp = {};
                                high_temp.carriage_number = res.trainRemainingSeats[i].carriage_no;
                                high_temp.seat_type = res.trainRemainingSeats[i].seat_type;
                                high_temp.upper_num = res.trainRemainingSeats[i].high_seat_upper;
                                high_temp.lower_num = res.trainRemainingSeats[i].high_seat_lower;
                                this.high_seat.push(high_temp);
                            }
                            if(res.trainRemainingSeats[i].seat_type == "硬卧")
                            {
                                let high_temp = {};
                                high_temp.carriage_number = res.trainRemainingSeats[i].carriage_no;
                                high_temp.seat_type = res.trainRemainingSeats[i].seat_type;
                                high_temp.upper_num = res.trainRemainingSeats[i].medium_seat_upper;
                                high_temp.middle_num = res.trainRemainingSeats[i].medium_seat_middle;
                                high_temp.lower_num = res.trainRemainingSeats[i].medium_seat_lower;
                                this.medium_seat.push(high_temp);
                            }
                            if(res.trainRemainingSeats[i].seat_type == "硬坐")
                            {
                                let high_temp = {};
                                high_temp.carriage_number = res.trainRemainingSeats[i].carriage_no;
                                high_temp.seat_type = "硬座";
                                high_temp.A_num = res.trainRemainingSeats[i].low_seat_A;
                                high_temp.B_num = res.trainRemainingSeats[i].low_seat_B;
                                high_temp.C_num = res.trainRemainingSeats[i].low_seat_C;
                                high_temp.D_num = res.trainRemainingSeats[i].low_seat_D;
                                high_temp.E_num = res.trainRemainingSeats[i].low_seat_E;
                                high_temp.F_num = res.trainRemainingSeats[i].low_seat_F;
                                this.low_seat.push(high_temp);
                            }
                        }
                        this.dialogTableVisible = true
                    }
                    this.$message({
                        type: 'message',
                        message: '查询成功'
                    });
                }
                else if(res.status == 404)
                {
                    this.$message({
                        type: 'error',
                        message: '请输入正确时间'
                    });
                }
                else
                {
                    this.$message({
                        type: 'error',
                        message: '查询失败'
                    });
                }

            },
            checkTime(i){
                if(i<10){

                    i = '0'+i

                }

                return i
            },
            handleBuy(index,datetime,train_no,start_no,end_no,train_number,high_seat_price,medium_seat_price,low_seat_price)
            {
                let date;
                date= new Date(datetime);
                console.log("date"+date);
                console.log("train_no"+typeof train_number);
                let datetime2 = date.getFullYear()+'-'+this.checkTime(date.getMonth()+1)+'-'+this.checkTime(date.getDate());
                this.$router.push({
                    path: '/TicketOrder',
                    query: {
                        datetime: datetime2,
                        train_no: train_no,
                        start_no:start_no,
                        end_no:end_no,
                        train_number:train_number,
                        high_seat_price:high_seat_price,
                        medium_seat_price:medium_seat_price,
                        low_seat_price:low_seat_price
                    }
                    /*query: {
                        key: 'key',
                        msgKey: this.msg
                    }*/
                })
            },
            transfer()
            {
                this.$router.push('/TrainTransferTicketQuery')
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
