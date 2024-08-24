import { motion } from 'framer-motion';

const AnimatedText = () => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}  // 初期状態
    animate={{ opacity: 1, x: 0 }}  // アニメーションの状態
    exit={{ opacity: 0, x: 100 }}  // コンポーネントが消えるときの状態
    whileHover={{ scale: 1.2, rotate: 10 }}  // ホバー時のアニメーション
    transition={{ duration: 0.5 }}  // アニメーションの速度
    className="text-xl font-bold text-blue-500"
  >
    ホバーテキスト
  </motion.div>
);

export default AnimatedText;
