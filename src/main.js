export function configure(aurelia) {
    return new Promise((resolve) => {
        aurelia.use
            .standardConfiguration()
            .developmentLogging()
            .globalResources(
                'pragma-tabsheet/pragma-tabsheet',
                'pragma-views/components/input-composite/input-composite',
                'pragma-views/components/icons/icons.html',
                'pragma-views/components/icons/icon.html',
                'pragma-views/components/group/group',
                'pragma-views/components/assistant/assistant',

                'components/pragma-screen-designer/pragma-screen-designer'
            )
            .plugin();

        aurelia.start().then(() => {
            aurelia.setRoot();
            resolve();
        });
    });
}