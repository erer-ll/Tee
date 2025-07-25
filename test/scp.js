//关于隐藏的表格
  document.getElementById('ycbg').addEventListener('click', function() {
    const table = document.getElementById('yctable');
    if (table.style.display === 'none') {
      table.style.display = 'table';
    } else {
      table.style.display = 'none';
    }
  });


  //查询
 // 增加一个高亮函数
  function clearHighlights() {
    // 移除所有高亮
    const allTds = document.querySelectorAll('#table-body td');
    allTds.forEach(td => td.classList.remove('highlight'));
  }

  document.getElementById('searchBtn').addEventListener('click', function() {
    const input = document.getElementById('search1').value.trim().toLowerCase();
    const tbody = document.getElementById('table-body');
    const rows = tbody.getElementsByTagName('tr');

    // 先清除所有高亮
    clearHighlights();

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      // 跳过按钮行
      if (row.querySelector('button')) continue; 
      const cells = row.getElementsByTagName('td');

      let matchFound = false;
      // 遍历每个单元格，判断是否包含关键词
      for (let j = 0; j < cells.length; j++) {
        if (cells[j]) {
          const cellText = cells[j].textContent.toLowerCase();
          const index = cellText.indexOf(input);
          if (index > -1 && input !== '') {
            matchFound = true;
            // 高亮匹配部分
            const highlightedText = cells[j].innerHTML.replace(
              new RegExp(`(${input})`, 'gi'),
              '<span class="highlight">$1</span>'
            );
            cells[j].innerHTML = highlightedText;
          }
        }
      }
      // 根据匹配结果显示或隐藏行
      if (matchFound) {
        row.classList.remove('hidden');
      } else {
        row.classList.add('hidden');
        // 如果隐藏，还原内容（防止多次点击导致高亮累积）
        // 这里简单处理：重新加载全部元素内容（这里为了简单没有复杂逻辑）
        // 实际项目可以用更完善的方法
      }
    }
  });