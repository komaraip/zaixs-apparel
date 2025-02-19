"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"

export default function Loading() {
  const [progress, setProgress] = React.useState(0)
 
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 100)
    return () => clearTimeout(timer)
  }, [])
 
  return (
    <div className="w-[100%] text-center">
      <h1>Loading...</h1>
      <Progress value={progress} />
    </div>
  )
}
