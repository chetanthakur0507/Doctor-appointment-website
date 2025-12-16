import Section_Head from '@/components/Section_Head'

const Appointment = () => {
    const Dept_list = {
        title: 'Select Department',
        options: [
            "Cardiology",
            "Orthopedics",
            "Neurology",
            "Pediatrics",
            "Dermatology"
        ]
    }
    const Doc_list = {
        title: 'Select Doctor',
        options: [
            "Dr. Arslan Ahmad",
            "Mrs. Amna",
            "Dr. Ahmad Raza",
            "Dr. Laiba",
            "Dr. Awais"
        ]
    }
    return (
        <div id='appointment' className='flex flex-col bg-blue-50 gap-1 py-16 md:p-24 text-center'>
            <Section_Head text='Let&apos;s make Appointment' />
            <p className='mb-5 px-4'>Here, you can effortlessly schedule appointments with our esteemed network of healthcare professionals, ensuring you receive the care you need, when you need it.</p>
            <form className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-2 px-4 sm:px-8'>
                <Input_Field type='text' placeholder='Your Name' />
                <Input_Field type='email' placeholder='Your Email' />
                <Input_Field type='number' placeholder='Your Number' />
                <Input_Field type='date' placeholder='Your Number' />
                <Option_Field title={Dept_list.title} options={Dept_list.options} />
                <Option_Field title={Doc_list.title} options={Doc_list.options} />
                <textarea
                    placeholder='Message (Optional)'
                    className='col-span-3 min-h-28 border border-blue-200 p-3 outline-none text-gray-500'></textarea>
                    <div className='col-span-3 text-center'>

                <button type='submit' className='bg-blue-500 px-5 py-2 text-white rounded-3xl'>Get Appointment</button>
                    </div>
            </form>
        </div>
    )
}


const Input_Field = ({ type, placeholder }) => {
    return (
        <>
            <input type={type} placeholder={placeholder} className='w-full border border-blue-200 text-gray-600 outline-none p-2 [appearance:input] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none font-sans' />
        </>
    )
}
const Option_Field = ({ title, options }) => {
    return (
        !title ? <></> :
            <>
                <select className='text-gray-500 rounded-sm pl-2 outline-none border border-blue-200'>
                    <option selected disabled>{title}</option>
                    {options.map((option, indx) => <option key={indx} className='py-3 rounded-sm'>{option}</option>
                    )}
                </select>
            </>
    )
}


export default Appointment