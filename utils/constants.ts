import { isDev } from "./helpers";

export const pricingPlans = [
    {
        name: 'Basic',
        price: 499,
        description: 'Perfect for occasional use',
        items:[
            '5 PDF summaries per month',
            'Standard processing speed',
            'Email support',
        ],
        id: 'basic',
        paymentLink: isDev ? 'https://buy.stripe.com/test_9B6eVfbqF5gMgBn5hSa7C00': '',
        priceId: isDev ? 'price_1S4vtZREsfQAZ4ggXTrFT7AB' :'',
    },
    {
        name: 'Pro',
        price: 1299,
        description: 'For professionals and teams',
        items: [
            'Unlimited PDF summaries',
            'Priority processing',
            '24/7 priority support',
            'Markdown Export'
        ],
        id: 'pro',
        paymentLink: isDev ? 'https://buy.stripe.com/test_4gMdRbcuJeRm98V39Ka7C01': '',
        priceId: isDev ? 'price_1S4vtZREsfQAZ4ggFqg5u6aL' :'',
       
    },
];

export const containerVariants = {
    hidden: {opacity:0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        }
    }
}

export const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible:{
        opacity:1,
        transition:{
            type: 'spring',
            damping: 15,
            stiffness: 50,
            duration:0.8,
        }
    }
}
