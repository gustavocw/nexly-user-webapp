import { Progress as ChakraProgress } from "@chakra-ui/react"
import { InfoTip } from "./toggle-tip"
import * as React from "react"

export const ProgressBar = React.forwardRef<
  HTMLDivElement,
  ChakraProgress.TrackProps & { bg?: string }
>(function ProgressBar(props, ref) {
  const { bg = "orange", ...rest } = props
  return (
    <ChakraProgress.Track bg="#00000060" {...rest} ref={ref}>
      <ChakraProgress.Range borderEndRadius="10px" bg={bg} />
    </ChakraProgress.Track>
  )
})

export interface ProgressLabelProps extends ChakraProgress.LabelProps {
  info?: React.ReactNode
}

export const ProgressLabel = React.forwardRef<
  HTMLDivElement,
  ProgressLabelProps
>(function ProgressLabel(props, ref) {
  const { children, info, ...rest } = props
  return (
    <ChakraProgress.Label {...rest} ref={ref}>
      {children}
      {info && <InfoTip>{info}</InfoTip>}
    </ChakraProgress.Label>
  )
})

export const ProgressRoot = ChakraProgress.Root
export const ProgressValueText = ChakraProgress.ValueText
