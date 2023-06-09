import React, { memo, useEffect } from 'react'
import moment from 'moment'
import Swal from 'sweetalert2'
import Clock from '../../hooks/Clock'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import { ImPower } from 'react-icons/im'
import TimeDeff from '../../hooks/TimeDeff'
import { IoMdFlashOff } from 'react-icons/io'
import { FcMoneyTransfer } from 'react-icons/fc'
import { FaHandHoldingUsd } from 'react-icons/fa'
import { BiWifiOff, BiWifi, } from 'react-icons/bi'
import { formatLocalTime } from '../../utils/utils'
import MONEY_GIF from '../../assets/images/money.gif'
import { BsFillPhoneVibrateFill } from 'react-icons/bs'
import withReactContent from 'sweetalert2-react-content'
import { RiCreativeCommonsZeroFill } from 'react-icons/ri'
import { MdAutoDelete, MdOutlineMobileOff, MdMobileFriendly } from 'react-icons/md'
import { useDeletePcMutation, useGetPcsQuery, useWithdrawalPcMutation } from './pcApiSlice'

const MySwal = withReactContent(Swal)

const PcItem = ({ pcId, index }) => {

    const { pc } = useGetPcsQuery('pcList', {
        selectFromResult: ({ data }) => ({
            pc: data?.entities[pcId],
        }),
    })

    const [delPc] = useDeletePcMutation()
    const [withdrawalPc, { data: withdrawalPcData, isSuccess, error }] = useWithdrawalPcMutation()

    const diffTime = (from, to) => {
        let diff = (new Date(from).getTime() - new Date(to).getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff))
    }

    const handleDelPc = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await delPc(pc?.id)

                MySwal.fire('Deleted!', 'Your registerd PC has been deleted.', 'success')
            }
        })
    }

    const handlewithdrawalPc = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, withdrawal it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await withdrawalPc(pc)
            }
        })
    }

    useEffect(() => {
        if (isSuccess) {
            MySwal.fire({
                title: `<h2 class='fw-bold'>Account Settlement</h2>`,
                html:
                    `<h3 class='fw-bold text-blue'>Money: <p class='text-dark'>${withdrawalPcData?.pc?.totalAmount} AFG</p></h3>
                    <h3 class='fw-bold mt-3 text-blue'>Share-File And Wifi Time: <p class='text-dark'>${withdrawalPcData?.passTime?.sharFileAndWifiTime} min, ${withdrawalPcData?.passTime?.sharFileAndWifi
                    } AFG</p ></h3 >
            <h3 class='fw-bold mt-3 text-blue'>Mobile Wifi Time: <p class='text-dark'>${withdrawalPcData?.passTime?.mobileWifiTime} min, ${withdrawalPcData?.passTime?.mobileWifi
                    } AFG</p></h3>`,
            })
        }
    }, [isSuccess]);

    return (
        !pc?.spendMoney &&
        (
            pc?.message
                ?
                <tr className={`text-center ${pc?.paid && 'disabled'} `}>
                    <td>{index + 1}</td>
                    <td><FcMoneyTransfer title='Get Money' size='20' cursor='pointer' onClick={handlewithdrawalPc} /></td>
                    <td><FaHandHoldingUsd /></td>
                    <td>{formatLocalTime(pc?.from)}</td>
                    <td colSpan={7}>{pc?.message}</td>
                    <td>{pc?.totalAmount ? `${pc?.totalAmount} afg` : <Image src={MONEY_GIF} alt='money-loader' width={30} />}</td>
                    <td>{moment(pc?.createdAt).format('llll')}</td>
                    <td>
                        <Link to={`/accessory/edit/${pc?.id} `}>
                            <FaEdit title='Edit' color='green' size='20' cursor='pointer' className='me-3' />
                        </Link>
                        <MdAutoDelete title='Delete' color='red' size='20' cursor='pointer' className='me-2' onClick={handleDelPc} />
                    </td>
                </tr>
                :
                <tr className={`text-center ${pc?.paid && 'disabled'} `}>
                    <td>{index + 1}</td>
                    <td><FcMoneyTransfer title='Get Money' size='20' cursor='pointer' onClick={handlewithdrawalPc} /></td>
                    <td>{pc?.pc ? pc?.pc : <MdMobileFriendly />}</td>
                    <td>{formatLocalTime(pc?.from)}</td>
                    <td>{pc?.paid ? formatLocalTime(pc?.to) : <Clock paid={pc?.paid} />}</td>
                    <td>{pc?.isUsingWifi ? <BiWifi size={20} color='#00b8a5' /> : <BiWifiOff size={20} color='red' />}</td>
                    <td>{pc?.isUsingWifi ? `${pc?.speed} mb` : <RiCreativeCommonsZeroFill size={20} color='red' />}</td>
                    <td>{pc?.isUsingMobileWifi ? <BsFillPhoneVibrateFill size={20} color='#00b8a5' /> : <MdOutlineMobileOff size={20} color='red' />}</td>
                    <td>{pc?.isUsingMobileWifi ? `${pc?.mobileSpeed} mb` : <RiCreativeCommonsZeroFill size={20} color='red' />}</td>
                    <td>{pc?.paid ? `${diffTime(pc?.from, pc?.to)} mins` : <TimeDeff from={pc?.from} />}</td>
                    <td>{pc?.isGenerator ? <ImPower size={20} color='#00b8a5' /> : <IoMdFlashOff size={20} color='red' />}</td>
                    <td>{(pc?.totalAmount === 0 || pc?.totalAmount) ? `${pc?.totalAmount} afg` : <Image src={MONEY_GIF} alt='money-loader' width={30} />}</td>
                    <td>{moment(pc?.createdAt).format('llll')}</td>
                    <td>
                        <Link to={`/pc/edit/${pc?.id}`}>
                            <FaEdit title='Edit' color='green' size='20' cursor='pointer' className='me-3' />
                        </Link>
                        <MdAutoDelete title='Delete' color='red' size='20' cursor='pointer' className='me-2' onClick={handleDelPc} />
                    </td>
                </tr>
        )
    )
}

export default memo(PcItem)
