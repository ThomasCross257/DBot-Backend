import selfcore from "selfcore";

const client = new selfcore();

const gateway = new selfcore.Gateway("mfa.ME0zwjcK0XRwkTWBrPYbcR18Lx-aWGGvMMnIPWjUCNqp38Mey2CO1P_4bXb84Q-_va5z4eBzrZ84d9EUA4US")

gateway.on("message", m => {
    if(m.channel_id === "963540210447163443") {
        let content = m.content ? m.content : { embeds: [m.embeds[0]]};

        client.sendWebhook("https://discord.com/api/webhooks/968668259710828645/s5pmMnNDDnQBtehXqAOKM7yDgRNiRuSyG6QjvH1sPx5MNLp8DGAI03Y-phCvZF79Iowe", content)
    }
});
    