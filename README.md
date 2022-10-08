# Feishu-Bot

## Intro

A simple module handle Feishu Bot

## Usage

```shell
npm i feishu-bot
```

```typescript
import Bot from 'feishu-bot'

const bot = new Bot('Your Feishu Webhook URL')

bot.sendText()
bot.sendRichText()

// You can registe your custom template richtext by bot.registeTemplace()
bot.registeTemplace()
```
