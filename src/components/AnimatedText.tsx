import { motion } from 'framer-motion';

const AnimatedText = () => (
  <motion.div
    initial={{ opacity: 20, x: 100 }}  // 初期状態
    whileInView={{ opacity: 10, x: 0 }}  // ビューに入ったときのアニメーション状態
    exit={{ opacity: 0, x: 100 }}  // コンポーネントが消えるときの状態
    transition={{ duration: 2 }}  // アニメーションの速度
    className="text-xl font-bold text-blue-500"
    viewport={{ once: true }}  // ビューに一度だけ表示されたときにアニメーションを実行
  >
    CATEGORY
  </motion.div>
);

export default AnimatedText;