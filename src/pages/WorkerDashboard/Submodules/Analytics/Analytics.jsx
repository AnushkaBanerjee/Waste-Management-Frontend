import React, { useState } from 'react';
import Banner from '../../../../components/Global/Banner/Banner';
import { Tabs, Tab, Card, CardBody, Tooltip, Chip } from "@nextui-org/react";
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import TimelineIcon from '@mui/icons-material/Timeline';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import useWindowDimensions from '../../../../components/Util/UseWindowDimensions';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import StatCard from '../../../../components/Global/StatCard/StatCard';
import { Backend_url } from '../../../../../BackendUrl';
import axios from 'axios';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

function WorkerAnalytics() {
    const [userData, setUserData] = useState();
    const data = useLoaderData()
    const [analytics, setAnalytics] = useState();
    const [rating, setRating] = useState(0);
    const [amount, setAmount] = useState([]);
    const [listId, setListId] = useState([]);
    const [item1, setItem1] = useState(0);
    const [item2, setItem2] = useState(0);
    const [item3, setItem3] = useState(0);
    const [item4, setItem4] = useState(0);
    const [item5, setItem5] = useState(0);
    const [item6, setItem6] = useState(0);
    const [item7, setItem7] = useState(0);
    const [totalItems, setTotalItems] = useState(0);


    const getCookie = (name) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    };

    useEffect(() => {
        setUserData(data);
        const getStudentAnalytics = async () => {
            try {
                const accessToken = getCookie('accessToken');
                if (!accessToken) {
                    console.error("Access token not found");
                    return null;
                }

                const response = await axios.get(`${Backend_url}/api/v1/users/worker-analytics`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });


                const customerAnalytics = response.data.data;

                const Quantity =[];
                const TotalAmount = [];
                const ids = [];

                customerAnalytics.totalContribution.forEach(contribution => {
                    Quantity.push(contribution.qty);
                    TotalAmount.push(parseFloat(contribution.totalAmount));
                    ids.push(new Date(contribution._id).toLocaleString());
                });

                setAmount(TotalAmount);
                setListId(ids);

                Quantity.forEach(qty => {
                    setItem1(item1+parseFloat(qty[0]));
                    setItem2(item2+parseFloat(qty[1]));
                    setItem3(item3+parseFloat(qty[2]));
                    setItem4(item4+parseFloat(qty[3]));
                    setItem5(item5+parseFloat(qty[4]));
                    setItem6(item6+parseFloat(qty[5]));
                    setItem7(item7+parseFloat(qty[6]));
                });
                    
                setTotalItems(item1+item2+item3+item4+item5+item6+item7);

                setAnalytics({
                    totalPickups: customerAnalytics.totalPickups,
                    totalPendingPickups: customerAnalytics.totalPendingPickups,
                    totalAcceptedPickups: customerAnalytics.totalAcceptedPickups,
                    totalCompletedPickups: customerAnalytics.totalCompletedPickups,
                });

                setRating(customerAnalytics.rating);


            } catch (error) {
                console.error(error);
            }
        };

        getStudentAnalytics();
    }, []);

    const { width } = useWindowDimensions();
    const [chart, setChart] = useState(1);
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    // const times = [
    //   new Date('2024-05-25T11:51:33').toLocaleString('en-GB'),
    //   new Date('2024-06-25T12:51:33').toLocaleString('en-GB'),
    //   new Date('2024-06-25T13:51:33').toLocaleString('en-GB'),
    //   new Date('2024-06-25T14:51:33').toLocaleString('en-GB'),
    //   new Date('2024-06-25T15:51:33').toLocaleString('en-GB'),
    //   new Date('2024-06-25T16:51:33').toLocaleString('en-GB'),
    //   new Date('2024-07-25T17:51:33').toLocaleString('en-GB')
    // ];
    const pieData = [
        { id: 0, value: item1, label: 'Paper' },
        { id: 1, value: item2, label: 'Plastic' },
        { id: 2, value: item3, label: 'Glass' },
        { id: 3, value: item4, label: 'Metal' },
        { id: 4, value: item5, label: 'Organic' },
        { id: 5, value: item6, label: 'E-waste' },
        { id: 6, value: item7, label: 'Others' },
    ];

    return (
        <div style={{
            height: "calc(100vh - 4.3rem)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            overflowY: "scroll",
            overflowX: "hidden",
            background: "#EDE9E9"
        }}>
            <Banner customer={userData?.data.fullName} page="Analytics" />
            <div className="rounded-md bg-cover bg-no-repeat flex justify-center items-center p-4">
                <Tabs
                    aria-label="Options"
                    placement='top'
                    color='primary'
                    className='flex justify-center '
                    onSelectionChange={(key) => setChart(Number(key))}
                >
                    <Tab key="1" title={
                        width < 800 ? <Tooltip key="overview" color="primary" content="Overview" className="capitalize"><PlagiarismIcon /></Tooltip> :
                            <div className="flex items-center space-x-2">
                                <PlagiarismIcon />
                                <span>Overview</span>
                            </div>
                    } />
                    <Tab key="2" title={
                        width < 800 ? <Tooltip key="accuracy" color="primary" content="Rating" className="capitalize"><NetworkCheckIcon /></Tooltip> :
                            <div className="flex items-center space-x-2">
                                <NetworkCheckIcon />
                                <span>Rating</span>
                            </div>
                    } />
                    <Tab key="3" title={
                        width < 800 ? <Tooltip key="performance" color="primary" content="Your Purchases" className="capitalize"><TimelineIcon /></Tooltip> :
                            <div className="flex items-center space-x-2">
                                <TimelineIcon />
                                <span>Your Purchases</span>
                            </div>
                    } />
                    <Tab key="4" title={
                        width < 800 ? <Tooltip key="submissions" color="primary" content="Waste Collected" className="capitalize"><DriveFolderUploadIcon /></Tooltip> :
                            <div className="flex items-center space-x-2">
                                <DriveFolderUploadIcon />
                                <span>Waste Collected</span>
                            </div>
                    } />
                </Tabs>
            </div>
            <div className='bg-white-default p-4 rounded-md h-auto  items-center'>
                {chart === 1 && (<div className="container items-center px-4 py-8 m-auto">
                    <div className="flex flex-wrap pb-3 mx-4 md:mx-24 lg:mx-0">

                        <StatCard value={analytics?.totalPickups} title="Total Pickups" />
                        <StatCard value={analytics?.totalPendingPickups} title="Pending Pickups" />
                        <StatCard value={analytics?.totalAcceptedPickups} title="Accepted Pickups" />
                        <StatCard value={analytics?.totalCompletedPickups} title="Completed Pickups" />

                    </div>
                </div>)}
                {chart === 2 && (
                    <div className='text-center md:flex md:justify-center'>
                        <div className='md:mr-16'>
                            <Gauge
                                value={Math.round(rating*100/5)}
                                startAngle={-110}
                                endAngle={110}
                                sx={{
                                    width: isMediumScreen ? 200 : 350,
                                    height: isMediumScreen ? 200 : 350,
                                    marginX: 'auto',
                                    [`& .${gaugeClasses.valueText}`]: {
                                        fontSize: isMediumScreen ? 20 : 35,
                                        transform: 'translate(0px, 0px)',
                                    },
                                }}
                                text={({ value, valueMax }) => `${value} / ${valueMax}`}
                            />
                            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                                Rating Meter
                            </Typography>
                        </div>
                        {/* <div>
              <Gauge
                value={75}
                startAngle={-110}
                endAngle={110}
                sx={{
                  width: isMediumScreen ? 200 : 350,
                  height: isMediumScreen ? 200 : 350,
                  marginX: 'auto',
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: isMediumScreen ? 20 : 35,
                    transform: 'translate(0px, 0px)',
                  },
                }}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
              />
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Feedback Meter
              </Typography>
            </div> */}
                    </div>
                )}
                {chart === 3 && (
                    <div className='text-center'>
                        <Typography variant="h6" component="div" sx={{ m: 2, textAlign: "left", paddingLeft: "10px" }}>
                            Your Purchases
                        </Typography>
                        <LineChart
                            grid={{ horizontal: true }}
                            xAxis={[
                                {
                                    scaleType: 'point',
                                    data: listId,
                                    label: 'Pickups',// Adjust this value if needed
                                },
                            ]}
                            yAxis={[
                                { id: 'Earning', scaleType: 'linear' },
                            ]}
                            series={[
                                { yAxisKey: 'Earning', data: amount, label: 'Earning' },
                            ]}
                            leftAxis="Earning"
                            height={400}
                        />

                    </div>
                )}
                {chart === 4 && (
                    <div className='text-center'>
                        <div className='text-left pl-4'>
                            <h1 className='my-6 text-xl'>Waste Collected in Kg</h1>
                        </div>

                        <div className='w-full xl:w-2/3 mx-auto'>
                            <PieChart
                                series={[
                                    {
                                        data: pieData,
                                        highlightScope: { faded: 'global', highlighted: 'item' },
                                        faded: { innerRadius: 30, additionalRadius: -20, color: 'gray' },
                                    },
                                ]}
                                height={isSmallScreen ? 100 : isMediumScreen ? 200 : 400}
                            />
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default WorkerAnalytics;
