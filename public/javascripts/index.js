$(document).ready(()=>{
    $('.delete-candidate').on('click',(e)=>{
        $target = $(e.target);
        var id = $target.attr('data-id');

        $.ajax({
            type:'DELETE',
            url:'/deletecandidate/'+id,
            success: function (response) {
                alert('Ddeleting Article at the moment...');
                window.location.href = '/';
            },
            error: function (err) {
                console.log(err);
            }
        })
    })
})