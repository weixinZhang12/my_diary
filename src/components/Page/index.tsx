import './index.css';
import { ReactNode } from 'react';
export interface Slot {
  children: ReactNode
}
const Page: React.FC<Slot> = ({ children }) => {
  // BUG 
  return (
    
        <div className="componments-page">
          {children}
        </div>
  
  );
};

export default Page;
