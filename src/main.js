export function configure(aurelia) {
    return new Promise((resolve) => {
        aurelia.use
            .standardConfiguration()
            .developmentLogging()
            .globalResources(
                'components/pragma-screen-designer/pragma-screen-designer'
            )
            .plugin('pragma-views', builder => builder.useAll());

        aurelia.start().then(() => {
            aurelia.setRoot();
            resolve();
        });
    });
}