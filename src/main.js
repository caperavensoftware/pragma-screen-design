export function configure(aurelia) {
    return new Promise((resolve) => {
        aurelia.use
            .standardConfiguration()
            .developmentLogging()
            .globalResources(
                'pragma-views/components/input-composite/input-composite',
                'pragma-views/components/icons/icons.html',
                'pragma-views/components/icons/icon.html',
                'pragma-views/components/group/group'
            )
            .plugin();

        aurelia.start().then(() => {
            aurelia.setRoot();
            resolve();
        });
    });
}