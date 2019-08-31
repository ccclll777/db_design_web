<template>

    <div>
        <meta  http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta  http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <el-steps :active="active" align-center style="margin-top: 10px">
            <el-step title="查询列车" ></el-step>
            <el-step title="选择座位" ></el-step>
            <el-step title="订单" ></el-step>
            <el-step title="改签成功" ></el-step>
        </el-steps>
        <el-table :data="passenger_data" v-show="show_passenger_ticket" style="width: 1000px;margin-left: 80px;margin-top: 20px">

            <el-table-column property="passenger_real_name" label="乘客姓名" ></el-table-column>
            <el-table-column property="passenger_phone_number" label="乘客电话号码" ></el-table-column>
            <el-table-column property="passenger_id_number" label="身份证号"></el-table-column>
            <el-table-column property="train_number" label="车次"></el-table-column>
            <el-table-column property="carriage_no" label="车厢号"></el-table-column>
            <el-table-column property="seat_type" label="座位类型"></el-table-column>
            <el-table-column property="seat_no" label="座位号"></el-table-column>

        </el-table>
        <el-row  v-show="active === 0" >
            <el-form >
                <el-row :gutter="20" style="margin-left: 300px;margin-top: 10px;width: 800px">
                    <el-col :span="6"><div class="grid-content bg-purple">
                        <el-input v-model="this.start_station_name" placeholder="请输入始发站">

                        </el-input>
                    </div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple" style="margin-left: 20px">
                        <el-input v-model="this.end_station_name" placeholder="请输入终点站">

                        </el-input>
                    </div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple" style="margin-left: 20px">
                        <el-input v-model="this.datetime" placeholder="请输入时间">

                        </el-input>
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
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="handleSearch(scope.$index,datetime,scope.row.train_no,scope.row.start_no,scope.row.end_no,scope.row.train_number)">查看余票</el-button>
                            <el-button
                                size="mini"
                                type="Success"
                                @click="handleBuy(scope.$index,datetime,scope.row.train_no,scope.row.start_no,scope.row.end_no,
                            scope.row.train_number,scope.row.high_seat_price,scope.row.medium_seat_price,scope.row.low_seat_price)">改签</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- Table -->
                </div>
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
        </el-row>

        <div v-show="active === 1 && dialogTableVisible_x" style="margin-top: 40px ;margin-left: 80px">
            <el-table :data="high_seat" >

                <el-table-column property="carriage_number" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type" label="座位类型" width="100"></el-table-column>
                <el-table-column property="upper_num" label="上铺" width="200"></el-table-column>
                <el-table-column property="lower_num" label="下铺" width="200"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'上铺')">上铺</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'下铺')">下铺</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-table :data="medium_seat">

                <el-table-column property="carriage_number" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type" label="座位类型" width="100"></el-table-column>
                <el-table-column property="upper_num" label="上铺" width="130"></el-table-column>
                <el-table-column property="middle_num" label="中铺" width="130"></el-table-column>
                <el-table-column property="lower_num" label="下铺" width="130"></el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'上铺')">上铺</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'中铺')">中铺</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'下铺')">下铺</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="low_seat">

                <el-table-column property="carriage_number" label="车厢号" width="70"></el-table-column>
                <el-table-column property="seat_type" label="座位类型" width="70"></el-table-column>
                <el-table-column property="A_num" label="A座" width="55"></el-table-column>
                <el-table-column property="B_num" label="B座" width="55"></el-table-column>
                <el-table-column property="C_num" label="C座" width="55"></el-table-column>
                <el-table-column property="D_num" label="D座" width="55"></el-table-column>
                <el-table-column property="E_num" label="E座" width="55"></el-table-column>
                <el-table-column property="F_num" label="F座" width="55"></el-table-column>
                <el-table-column label="操作" width="500">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'A')">A</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'B')">B</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'C')">C</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'D')">D</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'E')">E</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'F')">F</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <div v-show="active === 1 && dialogTableVisible_x_GD" style="margin-top: 40px ;margin-left: 80px;">
            <el-table :data="high_seat_GD">

                <el-table-column property="carriage_number" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type" label="座位类型" width="100"></el-table-column>
                <el-table-column property="A_num" label="A座" width="150"></el-table-column>
                <el-table-column property="B_num" label="B座" width="150"></el-table-column>
                <el-table-column property="C_num" label="C座" width="150"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'A')">A</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'B')">B</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'C')">C</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="medium_seat_GD">

                <el-table-column property="carriage_number" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type" label="座位类型" width="100"></el-table-column>
                <el-table-column property="A_num" label="A座" width="115"></el-table-column>
                <el-table-column property="B_num" label="B座" width="115"></el-table-column>
                <el-table-column property="C_num" label="C座" width="115"></el-table-column>
                <el-table-column property="D_num" label="D座" width="115"></el-table-column>
                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'A')">A</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'B')">B</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'C')">C</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'D')">D</el-button>

                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="low_seat_GD">

                <el-table-column property="carriage_number" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type" label="座位类型" width="100"></el-table-column>
                <el-table-column property="A_num" label="A座" width="90"></el-table-column>
                <el-table-column property="B_num" label="B座" width="90"></el-table-column>
                <el-table-column property="C_num" label="C座" width="90"></el-table-column>
                <el-table-column property="D_num" label="D座" width="90"></el-table-column>
                <el-table-column property="E_num" label="E座" width="90"></el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'A')">A</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'B')">B</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'C')">C</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'D')">D</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'E')">E</el-button>

                    </template>
                </el-table-column>
            </el-table>

        </div>

        <el-row  v-show="active === 2" >
            <el-table :data="passenger_data" v-show="show_order_list" style="width: 1000px;margin-left: 80px;margin-top: 20px">
                <el-table-column property="order_status" label="订单状态" ></el-table-column>
                <el-table-column property="order_id" label="订单号" ></el-table-column>
                <el-table-column property="passenger_real_name" label="乘客姓名" ></el-table-column>
                <el-table-column property="passenger_phone_number" label="乘客电话号码" ></el-table-column>
                <el-table-column property="passenger_id_number" label="身份证号"></el-table-column>
                <el-table-column property="train_number" label="车次"></el-table-column>
                <el-table-column property="carriage_no" label="车厢号"></el-table-column>
                <el-table-column property="seat_type" label="座位类型"></el-table-column>
                <el-table-column property="seat_no" label="座位号"></el-table-column>
                <el-table-column property="order_money" label="价格"></el-table-column>
            </el-table>







            <el-row style="margin-top: 30px;margin-left: 150px">
                <el-col :span="24"><div class="grid-content bg-purple-dark" style="color: #1c8de0">{{details}}</div></el-col>
            </el-row>
            <el-row style="margin-top: 20px">

                <el-button type="primary" @click="dialogFormVisible_wx = true" style="margin-left: 300px">微信支付</el-button>


                <el-button type="primary" @click="dialogFormVisible_zfb = true" style="margin-left: 300px">支付宝支付</el-button>

            </el-row>
            <el-button type="primary" @click="pay_success()"  style="margin-left: 500px">支付成功</el-button>

            <el-dialog title="微信支付" :visible.sync="dialogFormVisible_wx">
                <el-image
                    style="width: 300px; height: 500px ;"
                    :src="url1"
                    :fit="fit"></el-image>
            </el-dialog>
            <el-dialog title="支付宝支付" :visible.sync="dialogFormVisible_zfb">
                <el-image
                    style="width: 300px; height: 500px"
                    :src="url2"
                    :fit="fit"></el-image>
            </el-dialog>

        </el-row>
        <el-row   v-show="active === 3" >
            <div style="margin-top: 30px; margin-left: 50px;margin-right: 50px">
                <el-alert
                    title="恭喜您改签成功，请在未出行订单列表中查看"
                    type="success"
                    effect="dark">
                </el-alert>
            </div>
            <el-button type="primary" round @click="next" style="margin-left: 500px;margin-top: 30px">下一步</el-button>
        </el-row>



    </div>



</template>


<script>
    import headTop from '../components/headTop'
    import {queryTrainTicket,queryTrainTicketNum,getPassengerInfoByNumber,ticketChange,orderTrainTicket,getOrder,getOrderChangeResult,getOrderMoney,paySuccess} from '@/api/getData';
    import {setCookie,getCookie} from "../config/store_cookie";
    export default {
        name: "TicketOrder",
        data() {
            return {
                datetime:"",
                order_id:"",
                start_station_name:"",
                end_station_name:"",
                passenger_phone_number:"",
                active:0,
                train_number_old:"",
                tableData:[],
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
                searchForm:
                    {
                        start_station: '',
                        end_station:"",
                        datetime:""

                    },
                train_no: "",
                start_no:"",
                end_no:"",
                train_number:"",
                high_seat_price:"",
                medium_seat_price:"",
                low_seat_price:"",
                dialogTableVisible_x:false,
                dialogTableVisible_x_GD:false,
                passenger_data:
                    [],
                show_passenger_ticket:false,
                dialogFormVisible_wx:false,
                dialogFormVisible_zfb:false,
                show_order_list:false,
                details:"",
                url2:"https://39.105.44.114/zfb.JPG",
                url1:"https://39.105.44.114/wx.JPG",
                new_order_id:"",



            };
        },

        methods: {
            next() {
                this.active++;
                if (this.active == 1) {

                    this.getTicketCount();
                }
                if (this.active == 2) {
                    this.getOrderList();
                }
                if (this.active == 4) {
                    this.$router.push('AllOrderList')
                }
            },
            async  initData()
            {
                this.tableData = [];
                const res = await queryTrainTicket({train_start_station:this.start_station_name , train_end_station:this.end_station_name ,datetime :this.datetime})
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
            },
            async handleSearch(index,datetime,train_no,start_no,end_no,train_number)
            {
                const res = await queryTrainTicketNum({datetime:datetime, train_no:train_no ,start_no :start_no,end_no:end_no,train_number:train_number})
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
                    console.log( this.low_seat_GD)
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


                       this.train_no= train_no;
                        this.start_no =start_no;
                        this.end_no = end_no
                        this.train_number = train_number;
                        this.high_seat_price = high_seat_price;
                        this.medium_seat_price = medium_seat_price;
                        this.low_seat_price = low_seat_price;

                this.next();

            },
            async getTicketCount(){
                const res = await queryTrainTicketNum({datetime:this.datetime, train_no:this.train_no ,start_no :this.start_no,end_no:this.end_no,train_number:this.train_number})
                if(res.status == 1)
                {
                    if(this.train_number[0] == "G" || this.train_number[0] == "D")
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
                        this.dialogTableVisible_x_GD = true

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
                        this.dialogTableVisible_x = true
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
            async handleAdd(carriage_no,seat_type,seat_number)
            {
                const res = await getPassengerInfoByNumber({passenger_phone_number:this.passenger_phone_number})

                if(res.status == 1)
                {
                    this.passenger_data =[];
                    for(let i = 0 ; i< res.passengerInfos.length ; i++)
                    {
                        let temp = {};

                        temp.passenger_real_name = res.passengerInfos[i].passenger_real_name;
                        temp.passenger_id_number = res.passengerInfos[i].passenger_id_number;
                        temp.passenger_phone_number = res.passengerInfos[i].passenger_phone_number;
                        this.passenger_data.push(temp);

                    }
                    }
                console.log(this.passenger_data)
                let passenger_id_number = this.passenger_data[0].passenger_id_number;
                const res2 = await ticketChange({token:getCookie("token"),datetime:this.datetime, order_id :this.order_id,passenger_phone_number:this.passenger_phone_number})
                if(res2.status == 1)
                {
                    const res3 = await orderTrainTicket({token:getCookie("token"),datetime:this.datetime,train_no:this.train_no,start_no:this.start_no,
                        end_no:this.end_no,train_number:this.train_number,carriage_no:carriage_no,seat_type:seat_type,seat_number:seat_number,
                        passenger_phone_number:this.passenger_phone_number,passenger_id_number:passenger_id_number, high_seat_price: this.high_seat_price,
                        medium_seat_price:this.medium_seat_price,low_seat_price :this.low_seat_price});

                    if(res3.status == 1)
                    {
                        let temp = {};
                        temp.passenger_real_name = this.passenger_data[0].passenger_real_name;
                        temp.passenger_id_number =  this.passenger_data[0].passenger_id_number;
                        temp.passenger_phone_number =  this.passenger_data[0].passenger_phone_number;

                        this.passenger_data = [];
                        temp.train_number = this.train_number;
                        temp.carriage_no = res3.carriage_no;
                        temp.seat_type = res3.seat_type;
                        temp.seat_no = res3.result_seat_no;

                        this.passenger_data.push(temp);
                        this.show_passenger_ticket = true;
                        this.$message({
                            type: 'message',
                            message: '选座成功'
                        });
                        this.next();
                    }
                    else
                    {
                        this.$message({
                            type: 'error',
                            message: '选座失败'
                        });
                    }

                }


                },async getOrderList()
            {

                let old_money = "";
                let new_money = "";
                const res = await getOrder({order_id:this.order_id});
                if(res.status == 1)
                {
                    const res3 = await getOrderMoney({order_id:this.order_id});

                    this.passenger_data = [];
                    let temp = {};
                    if(res3.status == 1)
                    {
                        temp.order_money = res3.success;
                    }
                    old_money = temp.order_money;
                    temp.order_status = "改签前";
                    temp.order_id = this.order_id;
                    temp.passenger_id_number = res.getOrderListList[0].passenger_id_number;
                    temp.passenger_phone_number = res.getOrderListList[0].passenger_phone_number;
                    temp.passenger_real_name = res.getOrderListList[0].passenger_real_name;
                    temp.carriage_no = res.getOrderListList[0].carriage_no;
                    temp.seat_type = res.getOrderListList[0].seat_type;
                    temp.train_number = this.train_number_old;
                    temp.seat_no =  res.getOrderListList[0].seat_no;

                    this.passenger_data.push(temp);

                }

                const res2 = await getOrderChangeResult({token:getCookie("token"),datetime:this.datetime,train_no:this.train_no,start_no:this.start_no,
                    end_no:this.end_no , passenger_phone_number:this.passenger_phone_number });
                this.show_passenger_ticket = false;
                this.show_order_list = true;
                if(res2.status == 1)
                {
                    let temp = {};
                    const res4 = await getOrderMoney({order_id:res2.getOrderListList[0].order_id});
                    if(res4.status == 1)
                    {
                        temp.order_money = res4.success;
                    }
                    new_money =  temp.order_money;
                    temp.order_status = "改签后";
                    temp.order_id =res2.getOrderListList[0].order_id;
                    temp.passenger_id_number = res2.getOrderListList[0].passenger_id_number;
                    temp.passenger_phone_number = res2.getOrderListList[0].passenger_phone_number;
                    temp.passenger_real_name = res2.getOrderListList[0].passenger_real_name;
                    temp.seat_type = res2.getOrderListList[0].seat_type;
                    temp.carriage_no = res2.getOrderListList[0].carriage_no;
                    temp.train_number = this.train_number;
                    temp.seat_no =  res2.getOrderListList[0].seat_no;
                    this.new_order_id =  temp.order_id
                    this.passenger_data.push(temp);
                }
                this.show_passenger_ticket = false;
                this.show_order_list = true;

                old_money = old_money.substring(1,old_money.length);
                new_money = new_money.substring(1,new_money.length);
                old_money = parseFloat(old_money);
                new_money = parseFloat(new_money);
                if(old_money - new_money<0 )
                {
                    this.$message({
                        type: 'success',
                        message: "请支付差价¥"+ (new_money-old_money)
                    });
                    this.details = "请支付差价¥"+ (new_money-old_money);
                }
                else if(old_money - new_money == 0)
                {
                    this.pay_success();
                }
                else {
                    this.$message({
                        type: 'success',
                        message:"差价将自动退回您的账户",
                    });
                    this.details = "差价将自动退回您的账户";
                    this.pay_success();
                }


            },
            async  pay_success()
            {
                var order_id_list = "";
                        order_id_list = order_id_list+this.new_order_id +",";


                const res = await  paySuccess({token:getCookie("token"),datetime:this.datetime,train_no:this.train_no,start_no:this.start_no,
                    end_no:this.end_no,order_list:order_id_list});
                if(res.status == 1)
                {
                    this.$message({
                        message: res.success,
                        type: 'success'
                    });
                    this.next();
                }
                else
                {
                    this.$message({
                        message: "支付失败",
                        type: 'danger'
                    });
                }
            }
        },
        components: {
            headTop,
        },
        created(){
            if(this.$route.query.datetime == null || this.$route.query.order_id== null)

            {
                this.$message({
                    message: '请选择改签的订单',
                    type: 'warning'
                });
            }else

            {
                this.datetime = this.$route.query.datetime;
                this.order_id =  this.$route.query.order_id;
                this.start_station_name = this.$route.query.start_station_name;
                this.end_station_name =  this.$route.query.end_station_name;
                this.passenger_phone_number = this.$route.query.passenger_phone_number;
                this.searchForm.datetime = this.datetime;
                this.searchForm.start_station =  this.start_station_name;
                this.searchForm.end_station  =  this.end_station_name;
                this.train_number_old = this.$route.query.train_number;

            }
            this.initData();


        },

        mounted() {

        }


    }
</script>

<style lang="less">
    @import '../style/mixin';
    .explain_text{
        margin-top: 20px;
        text-align: center;
        font-size: 20px;
        color: #333;
    }
    .admin_set{
        width: 60%;
        background-color: #F9FAFC;
        min-height: 400px;
        margin: 20px auto 0;
        border-radius: 10px;
        ul > li{
            padding: 20px;
            span{
                color: #666;
            }
        }
    }
    .admin_title{
        margin-top: 20px;
        .sc(24px, #666);
        text-align: center;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        margin-top: 10px;
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
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
</style>
