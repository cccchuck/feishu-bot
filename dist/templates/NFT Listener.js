"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    msg_type: 'interactive',
    card: {
        config: {
            wide_screen_mode: true,
        },
        elements: [
            {
                tag: 'div',
                text: {
                    content: '**Hash:**\n{Hash}\n\n**From:**\n{From}\n\n**To:**\n{To}\n\n**TokenID:**\n{TokenID}\n\n',
                    tag: 'lark_md',
                },
            },
            {
                tag: 'hr',
            },
            {
                actions: [
                    {
                        tag: 'button',
                        text: {
                            content: '浏览器查看',
                            tag: 'plain_text',
                        },
                        type: 'primary',
                        url: '{URL}',
                    },
                ],
                tag: 'action',
            },
        ],
        header: {
            template: 'blue',
            title: {
                content: '⏰ 交易监控提醒',
                tag: 'plain_text',
            },
        },
    },
};
