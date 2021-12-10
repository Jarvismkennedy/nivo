/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { createElement, memo, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTooltip } from '@nivo/tooltip'

const SlicesItem = ({
    slice,
    axis,
    debug,
    tooltip,
    isCurrent,
    currentlyHovered,
    setSliceId,
    current,
    setCurrent,
    setCurrentlyHovered,
    height,
    onClick,
}) => {
    const { showTooltipFromEvent, showTooltipAt, hideTooltip } = useTooltip()

    const showSynchTooltip = useCallback(() => {
        if (isCurrent) {
            showTooltipAt(createElement(tooltip, { slice, axis }), [slice.x, height / 2], 'top')
        }
    }, [slice, isCurrent, currentlyHovered, showTooltipAt, tooltip])

    useEffect(() => {
        if (current === null) {
            hideTooltip()
        }
    }, [current, hideTooltip])

    useEffect(() => {
        showSynchTooltip()
    }, [showSynchTooltip])

    const handleMouseEnter = useCallback(
        event => {
            showTooltipAt(createElement(tooltip, { slice, axis }), [slice.x, height / 2], 'top')
            setCurrentlyHovered(true)
            setSliceId && setSliceId(slice.id)
            setCurrent(slice)
        },
        [showTooltipFromEvent, tooltip, slice]
    )

    // const handleMouseMove = useCallback(
    //     event => {
    //         //showTooltipFromEvent(createElement(tooltip, { slice, axis }), event, 'right')
    //         setPointIndex(slice.id)
    //     },
    //     [showTooltipFromEvent, tooltip, slice, setPointIndex]
    // )

    const handleMouseLeave = useCallback(() => {
        hideTooltip()
        setSliceId && setSliceId(null)
        setCurrentlyHovered(false)
        setCurrent(null)
    }, [hideTooltip, setSliceId, setCurrentlyHovered])

    const handleClick = useCallback(
        event => {
            onClick && onClick(slice, event)
        },
        [onClick]
    )
    return (
        <rect
            x={slice.x0}
            y={slice.y0}
            width={slice.width}
            height={slice.height}
            stroke="red"
            strokeWidth={debug ? 1 : 0}
            strokeOpacity={0.75}
            fill="red"
            fillOpacity={isCurrent && debug ? 0.35 : 0}
            onMouseEnter={handleMouseEnter}
            // onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        />
    )
}

SlicesItem.propTypes = {
    slice: PropTypes.object.isRequired,
    axis: PropTypes.oneOf(['x', 'y']).isRequired,
    debug: PropTypes.bool.isRequired,
    height: PropTypes.number.isRequired,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    isCurrent: PropTypes.bool.isRequired,
    setCurrent: PropTypes.func.isRequired,
}

export default memo(SlicesItem)
