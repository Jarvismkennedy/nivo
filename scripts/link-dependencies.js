const { exec } = require('child_process')

/**
 * This will automatically link all the @nivo/{package} dependencies
 *
 */

const packages = [
    'annotations',
    'arcs',
    'axes',
    'bar',
    'bullet',
    'bump',
    'calendar',
    'chord',
    'circle-packing',
    'colors',
    'core',
    'funnel',
    'generators',
    'geo',
    'heatmap',
    'legends',
    'line',
    'marimekko',
    'network',
    'parallel-coordinates',
    'pie',
    'radar',
    'recompose',
    'sankey',
    'scales',
    'scatterplot',
    'stream',
    'sunburst',
    'swarmplot',
    'tooltip',
    'treemap',
    'voronoi',
    'waffle',
]

const linkPackages = () => {
    packages.forEach(dir =>
        exec(`cd ../packages/${dir}; yarn link`, (error, stdout, stderr) => {
            if (error) {
                console.error(error)
                return
            }
            console.log(stdout)
            console.error(stderr)
        })
    )
    packages.forEach(dir => {
        packages.forEach(dep =>
            exec(`cd ../packages/${dir}; yarn link @nivo/${dep}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log(stdout)
                console.error(stderr)
            })
        )
    })
}

linkPackages()
