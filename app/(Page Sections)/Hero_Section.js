import Action_Button from '@/components/Action_Button'


const HeroSection = () => {
  return (
    <div id='herosection' className="flex gap-3 flex-col justify-center px-2 sm:px-10 lg:px-20 bg-cover bg-fixed bg-[url('https://bootstrapmade.com/demo/templates/Medilab/assets/img/hero-bg.jpg')] h-[80vh] w-full">
        <span className='text-5xl font-semibold text-blue-600'>WELCOME TO <span className="text-blue-500"><span className="text-blue-500">Medi.care</span></span></span>
        <p className="text-zinc-600 text-semilight">Your Path to Better Health Starts Here</p>
        <div className='w-32'>
        <Action_Button text="Get&nbsp;started" />
        </div>
    </div>
  )
}

export default HeroSection