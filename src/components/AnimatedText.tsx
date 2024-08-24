import { ShoppingCartIcon, SparklesIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// アイコンを配列に格納
const icons = [
  { component: <ShoppingCartIcon className="w-5 h-5 hover:text-blue-500 transition-colors duration-300" />, key: 'shopping-cart' },
  { component: <UserCircleIcon className="w-5 h-5 ml-1 hover:text-blue-500 transition-colors duration-300" />, key: 'user-circle' }
];

const AnimatedText = () => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}  // 初期状態
    animate={{ opacity: 1, x: 0 }}  // アニメーションの状態
    exit={{ opacity: 0, x: 100 }}  // コンポーネントが消えるときの状態
    whileHover={{ scale: 1.2, rotate: 10 }}  // ホバー時のアニメーション
    transition={{ duration: 0.5 }}  // アニメーションの速度
    className="text-xl font-bold text-blue-500"
  >
    {icons.map(icon => (
      <motion.div
        key={icon.key}
        whileHover={{ scale: 1.2, rotate: 10 }}  // アイコンごとのホバーアニメーション
        transition={{ duration: 0.5 }}  // アイコンごとのアニメーションの速度
      >
        {icon.component}
      </motion.div>
    ))}
  </motion.div>
);

export default AnimatedText;