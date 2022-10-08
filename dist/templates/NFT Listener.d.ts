declare const _default: {
    msg_type: string;
    card: {
        config: {
            wide_screen_mode: boolean;
        };
        elements: ({
            tag: string;
            text: {
                content: string;
                tag: string;
            };
            actions?: undefined;
        } | {
            tag: string;
            text?: undefined;
            actions?: undefined;
        } | {
            actions: {
                tag: string;
                text: {
                    content: string;
                    tag: string;
                };
                type: string;
                url: string;
            }[];
            tag: string;
            text?: undefined;
        })[];
        header: {
            template: string;
            title: {
                content: string;
                tag: string;
            };
        };
    };
};
export default _default;
