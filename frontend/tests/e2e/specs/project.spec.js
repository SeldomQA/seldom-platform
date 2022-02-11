describe('项目管理', () => {
  it('搜索项目', () => {
    cy.visit('/#/project')
    cy.get('[cy-data=search-project]', { timeout: 3000 }).first().type('项目名称')
    cy.get('[cy-data=search-button]', { timeout: 3000 }).first().click() // 搜索
  });
  it('列表翻页', () => {
    cy.visit('/#/project')
    cy.wait(2000)
    cy.get('ul.el-pager > li.number', { timeout: 3000 }).eq(1).click() // 点击第2页
    cy.get('button.btn-prev', { timeout: 3000 }).click() // 点击下一页
  });
  it('添加项目', () => {
    cy.visit('/#/project')
    cy.get('[cy-data=create-project]', { timeout: 3000 }).click()
    cy.wait(1000)
    cy.get('[cy-data=project-name]', { timeout: 3000 }).type('项目名称')
    cy.get('[cy-data=project-desc]', { timeout: 3000 }).type('项目备注信息')
    cy.get('[cy-data=save-button]', { timeout: 3000 }).click() // 保存项目
  });
  it('编辑项目', () => {
    cy.visit('/#/project')
    cy.get('[cy-data=edit-project]', { timeout: 3000 }).first().click({ force: true })
    cy.wait(1000)
    cy.get('[cy-data=project-name]', { timeout: 3000 }).clear().type('更新项目名称')
    cy.get('[cy-data=project-desc]', { timeout: 3000 }).clear().type('项目备注信息')
    cy.get('[cy-data=save-button]', { timeout: 3000 }).click() // 保存项目
  });
  it('删除项目', () => {
    cy.visit('/#/project')
    cy.wait(1000)
    cy.get('[cy-data=delete-project]', { timeout: 3000 }).first().click({ force: true }) // 删除项目
    cy.get('.el-message-box__btns > button', { timeout: 3000 }).eq(1).click() // 确定删除
  });
})
