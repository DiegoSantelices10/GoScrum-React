import React from 'react'
import Skeleton from 'react-loading-skeleton'


export default function cardSkeleton() {
  return (
    <>
      <div className="w-full">
        <div className="relative w-full md:w-full  mx-auto my-3 ">
          <div className="bg-white p-3 rounded-md shadow-md border text-sm">
            <h3 className="text-base font-semibold">{<Skeleton />}</h3>
            <h5 className="font-medium text-slate-600">{<Skeleton />}</h5>
            <h6 className="font-medium mb-2">{<Skeleton />}</h6>

            <p className="font-medium">{<Skeleton />}</p>
          </div>
        </div>
      </div>
      <div className=" w-full">
        <div className="relative w-full md:w-full  mx-auto my-3 ">
          <div className="bg-white p-3 rounded-md shadow-md border text-sm">
            <h3 className="text-base font-semibold">{<Skeleton />}</h3>
            <h5 className="font-medium text-slate-600">{<Skeleton />}</h5>
            <h6 className="font-medium mb-2">{<Skeleton />}</h6>

            <p className="font-medium">{<Skeleton />}</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="relative w-full md:w-full  mx-auto my-3 ">
          <div className="bg-white p-3 rounded-md shadow-md border text-sm">
            <h3 className="text-base font-semibold">{<Skeleton />}</h3>
            <h5 className="font-medium text-slate-600">{<Skeleton />}</h5>
            <h6 className="font-medium mb-2">{<Skeleton />}</h6>

            <p className="font-medium">{<Skeleton />}</p>
          </div>
        </div>
      </div>
    </>



  )
}
