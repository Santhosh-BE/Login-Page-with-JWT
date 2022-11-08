import React, { useEffect, useState } from "react";
import { ExpiredModal } from "./ExpiredModal"
import { addEventListeners, removeEventListeners } from './eventListner'

export const SessionExpired = () => {
  const [isWarningModalOpen, setWarningModalOpen] = useState(false);
  useEffect(() => {
    const createTimeout1 = () => setTimeout(() => {
      setWarningModalOpen(true);
    }, 4000)

    const createTimeout2 = () => setTimeout(() => {
      // Implement a sign out function here
      window.location.href = '/'
    }, 5000)

    const listener = () => {
      if (!isWarningModalOpen) {
        clearTimeout(timeout)
        timeout = createTimeout1();
      }
    }

    // Initialization
    let timeout = isWarningModalOpen ? createTimeout2() : createTimeout1()
    addEventListeners(listener);

    // Cleanup
    return () => {
      removeEventListeners(listener);
      clearTimeout(timeout);
    }
  }, [isWarningModalOpen])
  return (
    <div>
      {isWarningModalOpen && (
        <ExpiredModal
          isOpen={isWarningModalOpen}
          onRequestClose={() => setWarningModalOpen(false)}
        />
      )
      }
    </div>
  )
}