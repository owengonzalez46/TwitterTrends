import React from 'react'

export const Profiles = () => {
    return(
<div className="bg-white">
  <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
    <div className="space-y-12">
      <h2 className="text-3xl font-extrabold tracking-tight text-sky-700 sm:text-4xl">Meet our Team</h2>

      <ul role="list" className="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0">
        <li>
          <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
            <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
              <img className="object-cover shadow-lg rounded-lg" src="../owen-profile.jpg" alt=""/>
            </div>
            <div className="sm:col-span-2">
              <div className="space-y-4">
                <div className="text-lg leading-6 font-medium space-y-1">
                  <h3>Owen Gonzalez</h3>
                  <p className="text-sky-500">Network & Security Engineer @ USAA</p>
                  <p className="text-sky-500">UTSA Graduate Student</p>
                </div>
                <div className="text-lg">
                  <p className="text-gray-500">Owen is a 26 year old UTSA Graduate with degrees in Electrical Engineering and Computer Engineering. He is pursuing his Master's degree in Computer Science with a concentration in Cyber Security and Data Science.</p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
            <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
              <img className="object-cover shadow-lg rounded-lg" src="../diana-profile.jpg" alt=""/>
            </div>
            <div className="sm:col-span-2">
              <div className="space-y-4">
                <div className="text-lg leading-6 font-medium space-y-1">
                  <h3>Diana Dimitriu</h3>
                  <p className="text-sky-500">Software Engineer @ USAA</p>
                  <p className="text-sky-500">UTSA Graduate Student</p>
                </div>
                <div className="text-lg">
                  <p className="text-gray-500">Diana is a 25 year old UTSA Graduate with degrees in Electrical Engineering and Computer Engineering. She is pursuing her Master's degree in Computer Science with a concentration in Cyber Security and Data Science.</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul role="list" className="space-y-12 lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0">
        <li>
          <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
            <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
              <img className="object-cover shadow-lg rounded-lg" src="../daisy-profile.jpg" alt=""/>
            </div>
            <div className="sm:col-span-2">
              <div className="space-y-4">
                <div className="text-lg leading-6 font-medium space-y-1">
                  <h3>Daisy</h3>
                  <p className="text-sky-500">Senior Paw-grammer</p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
            <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
              <img className="object-cover shadow-lg rounded-lg" src="../hazel-profile.jpg" alt=""/>
            </div>
            <div className="sm:col-span-2">
              <div className="space-y-4">
                <div className="text-lg leading-6 font-medium space-y-1">
                  <h3>Hazel</h3>
                  <p className="text-sky-500">Junior Purr-grammer</p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
            <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
              <img className="object-cover shadow-lg rounded-lg" src="../cody-profile.jpg" alt=""/>
            </div>
            <div className="sm:col-span-2">
              <div className="space-y-4">
                <div className="text-lg leading-6 font-medium space-y-1">
                  <h3>Cody</h3>
                  <p className="text-sky-500">Systems Paw-grammer</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
    )
}