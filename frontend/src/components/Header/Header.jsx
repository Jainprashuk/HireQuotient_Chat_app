import React from 'react'

function Header() {
  return (
    <header>
    <div class="bg-gray-100 border-b border-gray-200">
        <div class="px-4 mx-auto sm:px-6 lg:px-8">
            <nav class="relative flex items-center justify-between h-16 lg:h-20">
                

                <div class="lg:absolute lg:-translate-x-1/2  lg:left-1/2">
                    <div class="flex-shrink-0 justify-center align-middle">
                        <a href="#" title="" class="flex justify-center align-middle ">
                            {/* <img class="w-auto h-8 lg:h-10" src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg" alt="" /> */}
                            <h1 className='text-center justify-center align-middle text-2xl text-gray-900'>TalkTroop - "Unleashing the power of words"</h1>
                        </a>
                    </div>
                </div>

                <button type="button" class="flex items-center justify-center ml-auto text-white bg-black rounded-full w-9 h-9 lg:hidden">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </button>

                <button type="button" class="inline-flex p-2 ml-5 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                
            </nav>
        </div>
    </div>

    <nav class="py-4 bg-white lg:hidden">
        <div class="px-4 mx-auto sm:px-6 lg:px-8">
            <div class="flex items-center justify-between">
                <p class="text-sm font-semibold tracking-widest text-gray-400 uppercase">Menu</p>

                <button type="button" class="inline-flex p-2 text-black transition-all duration-200 rounded-md focus:bg-gray-100 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="mt-6">
                <div class="flex flex-col space-y-2">
                    <a href="#" title="" class="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"> Features </a>

                    <a href="#" title="" class="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"> Solutions </a>

                    <a href="#" title="" class="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"> Resources </a>

                    <a href="#" title="" class="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"> Pricing </a>
                </div>

                <hr class="my-4 border-gray-200" />

                <div class="flex flex-col space-y-2">
                    <a href="#" title="" class="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"> Sign up </a>

                    <a href="#" title="" class="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"> Sign in </a>
                </div>
            </div>
        </div>
    </nav>
</header>

  )
}

export default Header