import { message, Modal, notification } from 'ant-design-vue'

export const useMessage = () => {
  const { t } = useI18n()
  return {
    // 消息提示
    info(content: string) {
      message.info(content)
    },
    // 错误消息
    error(content: string) {
      message.error(content)
    },
    // 成功消息
    success(content: string) {
      message.success(content)
    },
    // 警告消息
    warning(content: string) {
      message.warning(content)
    },
    // 弹出提示
    alert(content: string) {
      Modal.warning({ content, title: t('common.confirmTitle') })
    },
    // 错误提示
    alertError(content: string) {
      Modal.warning({ content, title: t('common.confirmTitle') })
    },
    // 成功提示
    alertSuccess(content: string) {
      Modal.warning({ content, title: t('common.confirmTitle') })
    },
    // 警告提示
    alertWarning(content: string) {
      Modal.warning({ content, title: t('common.confirmTitle') })
    },
    // 通知提示
    notify(content: string) {
      notification.info({ message: content })
    },
    // 错误通知
    notifyError(content: string) {
      notification.error({ message: content })
    },
    // 成功通知
    notifySuccess(content: string) {
      notification.success({ message: content })
    },
    // 警告通知
    notifyWarning(content: string) {
      notification.warning({ message: content })
    },
    // 确认窗体
    confirm(content: string) {
      return Modal.confirm({
        content,
        okText: t('common.ok'),
        cancelText: t('common.cancel'),
        type: 'warning',
      })
    },
    // 删除窗体
    delConfirm(content?: string) {
      return Modal.confirm({
        content,
        okText: t('common.ok'),
        cancelText: t('common.cancel'),
        type: 'warning',
      })
    },
    // 导出窗体
    exportConfirm(content?: string) {
      return Modal.confirm({
        content,
        okText: t('common.ok'),
        cancelText: t('common.cancel'),
        type: 'warning',
      })
    },
    // 提交内容
    prompt(content: string, tip: string) {
      return Modal.prompt(content, tip, {
        confirmButtonText: t('common.ok'),
        cancelButtonText: t('common.cancel'),
        type: 'warning',
      })
    },
  }
}
